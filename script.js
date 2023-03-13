const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();//отключаем дефолтное обновление страницы из-за формы
    const text = (this.querySelector('[name = item]')).value;
    const item = {
        text,
        done: false
    };

    items.push(item);//добавляем объект ввода в массив
    populateList(items, itemsList);//добавляем новую строку в класс plates
    localStorage.setItem('items', JSON.stringify(items));//записываем в LS в виде строк
    this.reset();//очищает форму после нажатия +add
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for='item${i}'>${plate.text}</label>
            </li>
        `;
    }).join('');//join превратит весь html код в одну строку
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;//берём только ввод данных, остальные события игнорим
    const el = e.target;
    console.log(el.dataset.index);
    const index = el.dataset.index;//узнаём индекс выбранной строки
    items[index].done = !items[index].done;//устанавливаем значение выбраннной строки
    localStorage.setItem('items', JSON.stringify(items));//сохр в LS
    populateList(items, itemsList);//принудительно обновляем форму
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);

