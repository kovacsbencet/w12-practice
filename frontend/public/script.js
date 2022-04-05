const parseJSON = async (url)=>{
    const response = await fetch(url);
    return response.json();
};

const userComponent = ({firstName, surname})=>{
    return `
        <div>
            <h1>${firstName}</h1>
            <h2>${surname}</h2>
        </div>
    `;
}

function addUserComponent(){
    return`
        <div>
            <input type="text" name="firstName" id="firstName" placeholder="First Name"><br>
            <input type="text" name="surname" id="surname" placeholder="Surname">
            <button id="submitButton">Send</button>
        </div>
    
    `
}

const loadEvent = async () => {

    if(window.location.pathname === "/admin/order-view"){
        console.log("Mi most az adminfelületen vagyunk.")
    } else {
        console.log("Mi most a vásárlói felületen vagyunk.")
    }

    const result = await parseJSON("/api/v1/users");
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(user => userComponent(user)).join("")
    );
    rootElement.insertAdjacentHTML(
        "afterend", 
        addUserComponent()
    );

    const submitButton = document.getElementById("submitButton");
    const firstName = document.getElementById("firstName")
    const surname = document.getElementById("surname")

    submitButton.addEventListener("click", e =>{
        const userData = {
            "firstName": firstName.value,
            "surname": surname.value
        };

        fetch("users/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(async (data) =>{
            const user = await data.json();

            rootElement.innerHTML = "";
            rootElement.insertAdjacentHTML("beforeend", userComponent(user));
        })
    })

    

};
window.addEventListener("load", loadEvent)