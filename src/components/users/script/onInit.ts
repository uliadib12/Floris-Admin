import type UserModel from "../../../model/users/userModel";

onInit()

async function onInit() : Promise<void> {
  const data = await getData();
  setDataToTable(data);
  makeContentVisible();
}

function getData() : Promise<UserModel[]> {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: `${import.meta.env.PUBLIC_BACKEND}/api/v1/users`,
        method: 'GET',
        success: (data) => {
            resolve(data);
        },
        error: (error) => {
            reject(error);
        }
    });
  });
}

function setDataToTable(data: UserModel[]) {
    const table = $('#dataTable')[0] as HTMLTableElement;
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    data.forEach((user) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.createdAt}</td>
            <td>${user.banned}</td>
        `;
        tbody.appendChild(tr);
    });
}

function makeContentVisible() {
    const content = $('#content-users')[0] as HTMLElement;
    content.classList.remove('invisible');
}