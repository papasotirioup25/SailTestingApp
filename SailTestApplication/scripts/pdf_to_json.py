#!/usr/bin/env python3
"""
PDF to JSON Converter for Quiz Questions
=========================================

This script extracts quiz questions from a PDF file and converts them
to the JSON format required by the sailing quiz application.

Requirements:
    pip install pdfminer.six

Expected PDF Format:
    1. Question text?
    A) Option 1
    B) Option 2
    C) Option 3
    D) Option 4
    Answer: B

Usage:
    python pdf_to_json.py input.pdf output.json
"""

import json
import re
import sys
from io import StringIO
from typing import List, Dict, Optional

try:
    from pdfminer.high_level import extract_text_to_fp
    from pdfminer.layout import LAParams
except ImportError:
    print("Error: pdfminer.six is not installed.")
    print("Please install it using: pip install pdfminer.six")
    sys.exit(1)


class QuizQuestionParser:
    """Parser for extracting quiz questions from PDF text."""

    def __init__(self):
        # Regex patterns for parsing questions
        self.question_pattern = re.compile(r'^\s*(\d+)\.\s+(.+?)$', re.MULTILINE)
        self.option_pattern = re.compile(r'^[A-D]\)\s+(.+?)$', re.MULTILINE)
        self.answer_pattern = re.compile(r'(?:Answer|Απάντηση):\s*([A-D])', re.IGNORECASE)

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """
        Extract text content from PDF file.

        Args:
            pdf_path: Path to the PDF file

        Returns:
            Extracted text as string
        """
        output_string = StringIO()

        with open(pdf_path, 'rb') as pdf_file:
            extract_text_to_fp(
                pdf_file,
                output_string,
                laparams=LAParams(),
                output_type='text',
                codec='utf-8'
            )

        text = output_string.getvalue()
        output_string.close()

        return text

    def parse_questions(self, text: str) -> List[Dict]:
        """
        Parse questions from extracted PDF text.

        This is a skeleton implementation. You'll need to customize
        the parsing logic based on your specific PDF format.

        Args:
            text: Extracted text from PDF

        Returns:
            List of question dictionaries
        """
        questions = []

        # Split text into sections (this is highly dependent on PDF format)
        # Example approach: split by question numbers
        sections = re.split(r'\n\s*\d+\.\s+', text)

        for i, section in enumerate(sections[1:], start=1):  # Skip first empty section
            try:
                question_data = self._parse_question_section(section, i)
                if question_data:
                    questions.append(question_data)
            except Exception as e:
                print(f"Warning: Failed to parse question {i}: {e}")
                continue

        return questions

    def _parse_question_section(self, section: str, question_id: int) -> Optional[Dict]:
        """
        Parse a single question section.

        Args:
            section: Text section containing one question
            question_id: Numeric ID for the question

        Returns:
            Dictionary with question data or None if parsing fails
        """
        lines = section.strip().split('\n')

        # Extract question text (usually the first line)
        question_text = lines[0].strip() if lines else ""

        if not question_text:
            return None

        # Extract options (A, B, C, D)
        options = []
        for line in lines[1:]:
            # Look for lines starting with A), B), C), D)
            match = re.match(r'^([A-D])\)\s*(.+?)$', line.strip())
            if match:
                options.append(match.group(2).strip())

        # Ensure we have exactly 4 options
        if len(options) != 4:
            print(f"Warning: Question {question_id} does not have 4 options")
            return None

        # Extract correct answer
        answer_match = self.answer_pattern.search(section)
        if not answer_match:
            print(f"Warning: No answer found for question {question_id}")
            return None

        # Convert answer letter (A, B, C, D) to index (0, 1, 2, 3)
        answer_letter = answer_match.group(1).upper()
        correct_answer_index = ord(answer_letter) - ord('A')

        return {
            "id": question_id,
            "question": question_text,
            "options": options,
            "correct_answer_index": correct_answer_index
        }

    def create_quiz_json(
        self,
        questions: List[Dict],
        title: str = "Τεστ Γνώσεων Ιστιοπλοΐας",
        time_limit: int = 3600,
        passing_score: int = 24
    ) -> Dict:
        """
        Create the complete quiz JSON structure.

        Args:
            questions: List of parsed questions
            title: Quiz title
            time_limit: Time limit in seconds
            passing_score: Minimum correct answers to pass

        Returns:
            Complete quiz data dictionary
        """
        return {
            "quiz_title": title,
            "time_limit_seconds": time_limit,
            "passing_score": passing_score,
            "total_questions": len(questions),
            "questions": questions
        }


def main():
    """Main entry point for the script."""

    # Parse command line arguments
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_json.py <input.pdf> <output.json>")
        print("\nExample:")
        print("  python pdf_to_json.py sailing_questions.pdf quiz_data.json")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_json = sys.argv[2]

    print(f"Processing PDF: {input_pdf}")

    # Initialize parser
    parser = QuizQuestionParser()

    try:
        # Step 1: Extract text from PDF
        print("Extracting text from PDF...")
        text = parser.extract_text_from_pdf(input_pdf)

        # Optional: Save extracted text for debugging
        with open('debug_extracted_text.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Debug: Extracted text saved to debug_extracted_text.txt")

        # Step 2: Parse questions
        print("Parsing questions...")
        questions = parser.parse_questions(text)

        if not questions:
            print("Error: No questions were parsed from the PDF.")
            print("Please check the PDF format and adjust parsing logic.")
            sys.exit(1)

        print(f"Successfully parsed {len(questions)} questions")

        # Step 3: Create quiz JSON structure
        quiz_data = parser.create_quiz_json(questions)

        # Step 4: Save to JSON file
        print(f"Writing to {output_json}...")
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(quiz_data, f, ensure_ascii=False, indent=2)

        print(f"\n✓ Success! Quiz data saved to {output_json}")
        print(f"  Total questions: {len(questions)}")
        print(f"  Time limit: {quiz_data['time_limit_seconds']} seconds")
        print(f"  Passing score: {quiz_data['passing_score']} correct answers")

    except FileNotFoundError:
        print(f"Error: File '{input_pdf}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
