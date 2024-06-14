const addBu = document.getElementById('Add');
const dbut = document.getElementById('Delete');
const saveBut = document.getElementById('save');
const actDel = document.getElementById('delete'); // actual delete button to delete selected tasks
const cancel = document.getElementById('cancel');

addBu.addEventListener('click', (event)=>{
    let row = document.createElement('tr');
    let th = document.createElement('th');
    let td = document.createElement('td');
    let inp = document.createElement('input');
    inp.setAttribute('type' , 'text');
    inp.setAttribute('class' , 'newest');
    inp.setAttribute('readonly', true);
    let inp2 = document.createElement('input');
    inp2.setAttribute('type' , 'text');
    inp2.setAttribute('readonly' , true);
    inp2.setAttribute('class' , 'newest');
    let check = document.createElement('input');
    check.setAttribute('type','checkbox');
    check.setAttribute('class', 'checker');
    th.appendChild(inp);
    td.appendChild(inp2);
    row.appendChild(th);
    row.appendChild(td);
    row.appendChild(check); 
    document.getElementById('TableTasks').appendChild(row);
    main();
})

// main function to add listener to edition and color of complete tasks

function main(){
    const tr = document.querySelectorAll('input[type="text"]');
    rows = document.querySelectorAll('tr');
    for(let i =0 ;i < rows.length; i++){
        let checker = rows[i].querySelector('[class="checker"]');
        if(checker != null){
            checker.addEventListener('click',event=>{
            if(checker.checked){
                rows[i].style.backgroundColor  = 'green';
            }
            else{
                if(i%2== 0){
                    rows[i].style.backgroundColor = 'rgb(206, 186, 224)';
                }
                else{
                    rows[i].style.backgroundColor = 'rgb(102, 109, 177)';
                }                
            }
            })
        }
    }

    for(let i = 0 ; i< tr.length; i++){
        tr[i].addEventListener("dblclick",(event)=>{
        tr[i].removeAttribute('readonly');
        tr[i].setAttribute('class' , 'newest');
        })
        tr[i].addEventListener('blur', (event)=>{
            tr[i].setAttribute('readonly',true);
        })
    }
    
};

function save(){
    localStorage.clear();
    let newst = document.querySelectorAll('input[class="newest"]');
    let flage = false; // flage for any empty field in table
    for(let i = 0 ;i < newst.length; i++){
        if(newst[i].value == ''){
            alert("please fillout all fields");
            flage = true;
            return;
        }
        else{
            newst[i].removeAttribute('class')
        }
    }
    if(flage){
        return;
    }
    const rows = document.querySelectorAll('#TableTasks tr');
    let tasks = {}
    rows.forEach(row =>{
        const inputs = row.querySelectorAll('input[type="text"]');
        const checkbox = row.querySelector('input[type="checkbox"]');
        if(inputs.length === 2 && checkbox){
        let task = {
            "description" : inputs[1].value,
            "complete" : checkbox.checked,
        }
        // let p = inputs[0].value;
        tasks[inputs[0].value] = task;
        }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    main();
}
document.addEventListener('onload',load());
function load(){
    let tasks ;
    try{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks == null){
            tasks = {};
        }
    }
    catch{
        tasks = {}; 
    }
    Object.keys(tasks).forEach(key=>{
        let row = document.createElement('tr');
        let th = document.createElement('th');
        let td = document.createElement('td');
        let inp = document.createElement('input');
        inp.setAttribute('type' , 'text');
        inp.setAttribute('class' , 'newest');
        inp.setAttribute('readonly', true);
        let inp2 = document.createElement('input');
        inp2.setAttribute('type' , 'text');
        inp2.setAttribute('readonly' , true);
        inp2.setAttribute('class' , 'newest');
        let check = document.createElement('input');
        check.setAttribute('type','checkbox');
        check.setAttribute('class','checker');
        inp.value = key;
        inp2.value = tasks[key]['description'];
        if(tasks[key]['complete']){
            check.checked = true;
            row.style.backgroundColor  = 'green';
        }
        th.appendChild(inp);
        td.appendChild(inp2);
        row.appendChild(th);
        row.appendChild(td);
        row.appendChild(check); 
        document.getElementById('TableTasks').appendChild(row);
    })
    main();
}

dbut.addEventListener('click',function(){
    addBu.style.display = 'none';
    dbut.style.display = 'none';
    saveBut.style.display = 'none'; 
    actDel.style.display = 'inline';
    cancel.style.display = 'inline';
    let td = document.createElement('button');
    td.setAttribute('id','selectAll');
    td.setAttribute('class','deletion');
    td.innerHTML = 'select All';
    let rows = document.querySelectorAll('tr');
    rows[0].appendChild(td);
    for(let i = 1; i < rows.length; i++){
        let check_box = document.createElement('input');
        check_box.setAttribute('type','checkbox');
        check_box.setAttribute('class','check')
        check_box.setAttribute('for','todelete');
        let temp = document.createElement('td');
        temp.setAttribute('class','deletion')
        temp.appendChild(check_box);
        rows[i].appendChild(temp);
    }
    td.addEventListener('click',event=>{
        let checkboxs = document.querySelectorAll('[for="todelete"]');
        let flageall = true;
        for(let i = 0 ; i< checkboxs.length; i++){
            if(!checkboxs[i].checked){
                flageall = false;
            }
        }
        if(!flageall){
            checkboxs.forEach(box=>{
                box.checked = true;
            })
        }
        else{
            checkboxs.forEach(box=>{
                box.checked = false;
            })
        }

    })
})

actDel.addEventListener('click',event=>{
    let table = document.getElementById('TableTasks');
    let rows = document.querySelectorAll('tr');
    let checkboxs = document.querySelectorAll('[for="todelete"]');
    let temp = document.querySelectorAll('[class="deletion"]');
    rows[0].removeChild(temp[0]);
    for(let i = 0 ;i < checkboxs.length;i++){
        if(checkboxs[i].checked){
            table.removeChild(rows[i+1]);
        }
        else{
            rows[i+1].removeChild(temp[i+1]);
        }
        
    }
    addBu.style.display = 'inline';
    dbut.style.display = 'inline';
    saveBut.style.display = 'inline';
    actDel.style.display = 'none'; 
    cancel.style.display = 'none';
    main();

})
cancel.addEventListener('click',event=>{
    let rows = document.querySelectorAll('tr');
    let temp = document.querySelectorAll('[class="deletion"]');
    for(let i = 0 ;i < temp.length; i++){
        rows[i].removeChild(temp[i]);
    }
    addBu.style.display = 'inline';
    dbut.style.display = 'inline';
    saveBut.style.display = 'inline';
    actDel.style.display = 'none'; 
    cancel.style.display = 'none';
    main();

})