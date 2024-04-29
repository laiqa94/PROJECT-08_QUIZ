import inquirer from "inquirer";
import chalk from "chalk";
// Example quiz
const quiz = {
    questions: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex: 0
        },
        {
            question: "What is the capital of Germany?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex: 2
        },
        {
            question: "What is the capital of Italy?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex: 3
        },
        {
            question: "What is the capital of Spain?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex: 1
        }
    ]
};
let score = 0;
async function askQuestion(question) {
    const answers = await inquirer.prompt(question);
    return answers;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
        console.log(chalk.green("Correct Answer"));
        return true;
    }
    else {
        console.log(chalk.red("Wrong Answer"));
        return false;
    }
}
async function runQuiz(quiz, quizNumber) {
    for (const question of quiz.questions) {
        const shuffledOptions = shuffleArray([...question.options]);
        const answers = await askQuestion({
            name: "answer",
            type: "list",
            message: question.question,
            choices: shuffledOptions
        });
        const userAnswer = answers.answer;
        const correctAnswer = question.options[question.correctAnswerIndex];
        if (checkAnswer(userAnswer, correctAnswer)) {
            score++;
        }
    }
    const percentageScore = (score / quiz.questions.length) * 100;
    console.log(chalk.blue(`Quiz Completed! Your score: ${score}/${quiz.questions.length} (${percentageScore}%)`));
}
//run the quiz
runQuiz(quiz, 1);
