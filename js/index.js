document.addEventListener("DOMContentLoaded", ()=>{
    console.log('DOM fully loaded.');
    htmlDisplay();
    postToServer();
})
function htmlDisplay(){
    const body=document.querySelector('body');
    body.innerHTML=`
    <h1>Monstr Inc.</h1>
    <form>
    <input type="text" placeholder="name..."/>
    <input type="text" placeholder="age..."/>
    <input type="text" placeholder="description..."/>
    <button id="createMonBtn">Create Monster</button>
    </form>
    `;
    fetchMonsters(body);
}
function fetchMonsters(bodySec){
    fetch('http://localhost:3000/monsters')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        data.forEach(monster=>{
            const div=document.createElement('div');
            div.innerHTML=`
            <h3>${monster.name}</h3>
            <h4>${monster.age}</h4>
            <p>${monster.description}</p>
            `;
            bodySec.appendChild(div);
        })
    })
}
function postToServer(){
const createMonsterBtn=document.getElementById('createMonBtn');
createMonsterBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const nameOfMonster=document.getElementsByTagName('input')[0].value;
    const ageOfMonster=document.getElementsByTagName('input')[1].value;
    const descriptionOfMonster=document.getElementsByTagName('input')[2].value;
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify({
            name:nameOfMonster,
            age:ageOfMonster,
            description:descriptionOfMonster
        })
    }
    )
    .then(response=>response.json())
    .then(data=>console.log(data))
})
}