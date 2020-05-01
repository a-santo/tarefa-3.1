const urlBase = "https://fcawebbook.herokuapp.com"
let isNew = true

//como não existe o end-point dos voluntários, vou criar voluntários fixos para efeitos académicos
//para esse efeito, recorreu-se ao seguinte site: https://www.fakenamegenerator.com/gen-male-br-pt.php
let volunteers = [
    {
        "idVolunteer": 1,
        "nome": "Sofia Fernandes Cardoso",
        "telefone": "21 222 523 4360",
        "foto": "http://xxx.pt"
    },
    {
        "idVolunteer": 2,
        "nome": "Eduarda Rocha Pinto",
        "telefone": "21 265 261 2913",
        "foto": "http://xxx.pt"
    },
    {
        "idVolunteer": 3,
        "nome": "André Cavalcanti Gomes",
        "telefone": "21 253 987 6160",
        "foto": "http://xxx.pt"
    },
    {
        "idVolunteer": 4,
        "nome": "Carla Azevedo Oliveira",
        "telefone": "21 291 733 9480",
        "foto": "http://xxx.pt"
    },
    {
        "idVolunteer": 5,
        "nome": "Guilherme Castro Silva",
        "telefone": "21 215 388 4505",
        "foto": "http://xxx.pt"
    }
]

window.onload = () => {
    // References to HTML objects
    const tblVolunteer = document.getElementById("tblVolunteers")
    const frmVolunteer = document.getElementById("frmVolunteer")


    frmVolunteer.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtName = document.getElementById("txtName").value
        const txtPhone = document.getElementById("txtPhone").value
        const txtPhoto = document.getElementById("txtPhoto").value

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um voluntário
        //como não existe este end-point, serão lidos da variável voluntários, para efeitos meramente académicos...
        if (isNew) {
            // ler o id do último voluntário e acrescentar mais um..
            const ultimo = volunteers[volunteers.length - 1]
            volunteers.push(
                {
                    "idVolunteer": ultimo.idVolunteer + 1,
                    "nome": txtName,
                    "telefone": txtPhone,
                    "foto": txtPhoto
                }
            )
        } else {
            for (const volunteer of volunteers) {
                if (volunteer.idVolunteer == txtVolunteerId) {
                    volunteer.nome = txtName;
                    volunteer.telefone = txtPhone;
                    volunteer.foto = txtPhoto;
                }
            }
        }
        /*
        let response
        if (isNew) {
            // Adiciona Voluntário
            response = await fetch(`${urlBase}/volunteers`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}&active=1`
            })
            const newVolunteerId = response.headers.get("Location")
            const newVolunteer = await response.json()
            // Associa voluntário à conferência WebConfernce
            const newUrl = `${urlBase}/conferences/1/volunteer/${newVolunteerId}`
            const response2 = await fetch(newUrl, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            })
            const newVolunteer2 = await response2.json()
        } else {
            // Atualiza Voluntário
            response = await fetch(`${urlBase}/volunteers/${txtVolunteerId}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "PUT",
                body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}&active=1`
            })

            const newVolunteer = await response.json()
        }
        */
        isNew = true
        renderVolunteers()
    })



    const renderVolunteers = async () => {
        frmVolunteer.reset()
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Voluntários</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-50'>Nome</th>
                    <th class='w-38'>Telefone</th>              
                    <th class='w-10'></th>              
                </tr> 
            </thead><tbody>
        `
        //const response = await fetch(`${urlBase}/conferences/1/volunteers`)
        //const volunteers = await response.json()
        let i = 1
        for (const volunteer of volunteers) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${volunteer.nome}</td>
                    <td>${volunteer.telefone}</td>
                    <td>
                        <i id='${volunteer.idVolunteer}' class='fas fa-edit edit'></i>
                        <i id='${volunteer.idVolunteer}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblVolunteer.innerHTML = strHtml

        // Gerir o clique no ícone de Editar
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                isNew = false
                for (const volunteer of volunteers) {
                    if (volunteer.idVolunteer == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtVolunteerId").value = volunteer.idVolunteer
                        document.getElementById("txtName").value = volunteer.nome
                        document.getElementById("txtPhone").value = volunteer.telefone
                        document.getElementById("txtPhoto").value = volunteer.foto
                    }
                }
            })
        }

        // Gerir o clique no ícone de Remover
        const btnDelete = document.getElementsByClassName("remove")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
                swal({
                    title: 'Tem a certeza?',
                    text: "Não será possível reverter a remoção!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Remover'
                }).then(async (result) => {
                    if (result.value) {
                        let volunteerId = btnDelete[i].getAttribute("id")
                        console.log(volunteerId);
                        try {
                            /*
                            const response = await fetch(`${urlBase}/conferences/1/volunteers/${volunteerId}`, {
                                method: "DELETE"
                            })
                            if (response.status == 204) {
                                swal('Removido!', 'O voluntário foi removido da Conferência.', 'success')
                            }
                            */
                            for(var k = volunteers.length -1; k >= 0 ; k--){
                                if(volunteers[k].idVolunteer == volunteerId) {
                                    volunteers.splice(k, 1);
                                    swal('Removido!', 'O voluntário foi removido da Conferência.', 'success');
                                    renderVolunteers();
                                    return;
                                }
                            }
                        } catch (err) {
                            swal({
                                type: 'error',
                                title: 'Erro',
                                text: err
                            })
                        }
                        renderVolunteers()
                    }
                })
            })
        }
    }
    renderVolunteers()
}