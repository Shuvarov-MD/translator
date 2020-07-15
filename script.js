document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form'),
    textarea = document.getElementById('textarea'),
    translateEnRu = document.getElementById('en-ru'),
    translateRuEn = document.getElementById('ru-en'),
    result = document.getElementById('result');

  const createResponse = url => fetch(url);

  form.addEventListener('submit', event => {
    event.preventDefault();
    let lang = '';
    if (translateEnRu.checked) {
      lang = 'en-ru';
    } else if (translateRuEn.checked) {
      lang = 'ru-en';
    }
    const text = textarea.value,
      url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190704T212630Z.c409bb9604ae7251.df09dbd89372575b02298ed0970f8e45c749648b&text=${text}&lang=${lang}`;

      createResponse(url).then(response => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        console.log(response);
          response.text().then(function(data) {
            data = JSON.parse(data);
            result.textContent = data.text;
          });
        }).catch(error => {
        console.error(error);
      });
  });
});
