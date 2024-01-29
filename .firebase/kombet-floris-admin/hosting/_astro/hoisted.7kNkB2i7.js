import"./onInit.tzFMZM2B.js";i();async function i(){const t=await o();c(t),l()}function o(){return new Promise((t,d)=>{t([{id:1,email:"john@gmail.com",createdDate:"2021-01-01",banned:!1},{id:2,email:"aduh@gmail.com",createdDate:"2021-01-02",banned:!1}])})}function c(t){const n=$("#dataTable")[0].getElementsByTagName("tbody")[0];n.innerHTML="",t.forEach(e=>{const a=document.createElement("tr");a.innerHTML=`
            <td>${e.id}</td>
            <td>${e.email}</td>
            <td>${e.createdDate}</td>
            <td>${e.banned}</td>
        `,n.appendChild(a)})}function l(){$("#content-users")[0].classList.remove("invisible")}
