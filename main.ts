import  inquirer, { Answers } from "inquirer"
import chalk from "chalk"
import Choices from "inquirer/lib/objects/choices.js";
import ListPrompt from "inquirer/lib/prompts/list.js";

interface Question{
    question:string,
    options:string[],
    correctAnswerIndex:number
}

//define the interface for a quiz
interface Quiz{
    questions:Question[];
}

// Example quiz
const quiz:Quiz = {

    questions:[
        {
            question:"What is the capital of France?",
            options:["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex:0
        },
        { 
            question:"What is the capital of Germany?",
            options:["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex:2
        },
        {
            question:"What is the capital of Italy?",
            options:["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex:3
        },
        { 
            question:"What is the capital of Spain?",
            options:["Paris", "London", "Berlin", "Madrid"],
            correctAnswerIndex:1
        }

    ]
}




let score = 0;

async function askQuestion(question: any) {
    const answers = await inquirer.prompt(question);
    return answers;
}

function shuffleArray(array: any[]): any[] { 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer(answer: string, correctAnswer: string): boolean { 
    if (answer === correctAnswer) {
        console.log(chalk.green("Correct Answer"));
        return true;
    } else {
        console.log(chalk.red("Wrong Answer"));
        return false;
    }
}

async function runQuiz(quiz: Quiz, quizNumber: number): Promise<void> { 
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






































