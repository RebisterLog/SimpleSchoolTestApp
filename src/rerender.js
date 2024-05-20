const Test_Name = "Тест по теме \"Металлы и Неметаллы\"";

document.getElementById('answer-true').addEventListener('click', async () => {
    window.electron.answer(true);
});

document.getElementById('answer-false').addEventListener('click', async () => {
    window.electron.answer(false);
});

document.getElementById('start').addEventListener('click', async () => { 
    document.getElementById("name").innerHTML = Test_Name;   
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('answer-true').style.visibility = 'visible';
    document.getElementById('answer-false').style.visibility = 'visible';
    window.electron.start();
});

window.electron.onNextQuestion((question) => {
    document.getElementById('question-text').innerText = question;
});

window.electron.onResult((CorrectAnswers, IncorrectAnswers) => {
    document.getElementById('question-text').innerText = "";
    document.getElementById('answer-true').style.visibility = 'hidden';
    document.getElementById('answer-false').style.visibility = 'hidden';

    document.getElementById('start').innerHTML = "Начать заново";
    document.getElementById('start').style.visibility = 'visible';

    document.getElementById("name").innerHTML = `Тест завершен!\n Правильных ответов: ${CorrectAnswers}/${CorrectAnswers+IncorrectAnswers}`;
})