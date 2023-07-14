export interface Quiz {
    response_code: number;
    results:       Result[];
}

export interface Result {
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
    selected_answer: string
}