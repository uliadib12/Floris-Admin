import"./onInit.tzFMZM2B.js";c();async function c(){const t=await i();d(t),s()}function i(){return new Promise((t,a)=>{$.ajax({url:"https://floris-backend-fqzecn2umq-uc.a.run.app/api/v1/users",method:"GET",success:n=>{t(n)},error:n=>{a(n)}})})}function d(t){const n=$("#dataTable")[0].getElementsByTagName("tbody")[0];n.innerHTML="",t.forEach(e=>{const o=document.createElement("tr");o.innerHTML=`
            <td>${e.id}</td>
            <td>${e.email}</td>
            <td>${e.createdAt}</td>
            <td>${e.banned}</td>
        `,n.appendChild(o)})}function s(){$("#content-users")[0].classList.remove("invisible")}
