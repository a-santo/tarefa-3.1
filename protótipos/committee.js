const urlBase = "https://fcawebbook.herokuapp.com"
let isNew = true

//como não existe o end-point dos membros do comité, vou criar membros fixos para efeitos académicos
//para esse efeito, recorreu-se ao seguinte site: https://www.fakenamegenerator.com/gen-male-br-pt.php
let committeeMembers = [
    {
        "idMember": 1,
        "nome": "Victor Barros Dias",
        "email": "VictorBarrosDias@jourrapide.com",
        "telefone": "212587828541",
        "foto": "http://xxx.pt",
        "instituicao": "Universidade Aberta",
        "profissao": "Personnel clerk"
    },
    {
        "idMember": 2,
        "nome": "Melissa Pereira Silva",
        "email": "MelissaPereiraSilva@dayrep.com",
        "telefone": "212275198683",
        "foto": "http://xxx.pt",
        "instituicao": "Universidade da Beira Interior",
        "profissao": "Mail processor"
    },
    {
        "idMember": 3,
        "nome": "Livia Oliveira Fernandes",
        "email": "LiviaOliveiraFernandes@jourrapide.com",
        "telefone": "212193983188",
        "foto": "http://xxx.pt",
        "instituicao": "Universidade Nova",
        "profissao": "Travel guide"
    },
    {
        "idMember": 4,
        "nome": "Emily Rocha Pinto",
        "email": "EmilyRochaPinto@dayrep.com",
        "telefone": "212716363675",
        "foto": "http://xxx.pt",
        "instituicao": "Universidade Aberta",
        "profissao": "Radiation protection technician"
    },
    {
        "idMember": 5,
        "nome": "Rodrigo Silva Correia",
        "email": "RodrigoSilvaCorreia@dayrep.com",
        "telefone": "212533471383",
        "foto": "http://xxx.pt",
        "instituicao": "Universidade do Algarve",
        "profissao": "Natural sciences manager"
    }
]

window.onload = () => {
    // References to HTML objects
    const tblCommitteeMember = document.getElementById("tblCommitteeMembers")
    const frmCommitteeMember = document.getElementById("frmCommitteeMember")

    frmCommitteeMember.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtName = document.getElementById("txtName").value
        const txtEmail = document.getElementById("txtEmail").value
        const txtPhone = document.getElementById("txtPhone").value
        const txtPhoto = document.getElementById("txtPhoto").value
        const txtSchool = document.getElementById("txtSchool").value
        const txtJob = document.getElementById("txtJob").value
        const txtCommitteeMemberId = document.getElementById("txtCommitteeMemberId").value

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um membro
        //como não existe este end-point, serão lidos da variável committeeMembers, para efeitos meramente académicos...
        if (isNew) {
            // ler o id do último membro do comité e acrescentar mais um..
            const ultimo = committeeMembers[committeeMembers.length - 1]
            committeeMembers.push(
                {
                    "idMember": ultimo.idMember + 1,
                    "nome": txtName,
                    "email": txtEmail,
                    "telefone": txtPhone,
                    "foto": txtPhoto,
                    "instituicao": txtSchool,
                    "profissao": txtJob
                }
            )
        } else {
            for (const member of committeeMembers) {
                if (member.idMember == txtCommitteeMemberId) {
                    member.nome = txtName;
                    member.email = txtEmail;
                    member.telefone = txtPhone;
                    member.foto = txtPhoto;
                    member.instituicao = txtSchool;
                    member.profissao = txtJob;
                }
            }
        }
        /*
        let response
        if (isNew) {
            // Adiciona Membro do comité
            response = await fetch(`${urlBase}/committee`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `nome=${txtName}&email=${txtEmail}&foto=${txtPhoto}&telefone=${txtPhone}&instituicao=${txtSchool}&profissao=${txtJob}&active=1`
            })
            const newCommitteeMemberId = response.headers.get("Location")
            const newCommitteeMember = await response.json()
            // Associa membro do comité à conferência WebConfernce
            const newUrl = `${urlBase}/conferences/1/committee/${newCommitteeMemberId}`
            const response2 = await fetch(newUrl, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            })
            const newCommitteeMemberId2 = await response2.json()
        } else {
            // Atualiza membro
            response = await fetch(`${urlBase}/committee/${txtCommitteeMemberId}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "PUT",
                body: `nome=${txtName}&email=${txtEmail}&foto=${txtPhoto}&telefone=${txtPhone}&instituicao=${txtSchool}&profissao=${txtJob}&active=1`
            })

            const newCommitteeMember = await response.json()
        }
        */
        isNew = true
        renderCommitteeMembers()
    })

    const renderCommitteeMembers = async () => {
        frmCommitteeMember.reset()
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Membros do comité</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-50'>Nome</th>
                    <th class='w-38'>Profissão</th>              
                    <th class='w-10'></th>              
                </tr> 
            </thead><tbody>
        `
        //const response = await fetch(`${urlBase}/conferences/1/comitteemembers`)
        //const comitteeMembers = await response.json()
        let i = 1
        for (const member of committeeMembers) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${member.nome}</td>
                    <td>${member.profissao}</td>
                    <td>
                        <i id='${member.idMember}' class='fas fa-edit edit'></i>
                        <i id='${member.idMember}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblCommitteeMember.innerHTML = strHtml

        // Gerir o clique no ícone de Editar
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                isNew = false
                for (const member of committeeMembers) {
                    if (member.idMember == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtCommitteeMemberId").value = member.idMember
                        document.getElementById("txtName").value = member.nome
                        document.getElementById("txtEmail").value = member.email
                        document.getElementById("txtPhone").value = member.telefone
                        document.getElementById("txtPhoto").value = member.foto
                        document.getElementById("txtSchool").value = member.instituicao
                        document.getElementById("txtJob").value = member.profissao
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
                        let memberId = btnDelete[i].getAttribute("id")
                        try {
                            /*
                            const response = await fetch(`${urlBase}/conferences/1/comitteemembers/${memberId}`, {
                                method: "DELETE"
                            })
                            if (response.status == 204) {
                                swal('Removido!', 'Este membro do comité foi removido da Conferência.', 'success')
                            }
                            */
                            for(var k = committeeMembers.length -1; k >= 0 ; k--){
                                if(committeeMembers[k].idMember == memberId) {
                                    committeeMembers.splice(k, 1);
                                    swal('Removido!', 'Este membro do comité foi removido da Conferência.', 'success');
                                    renderCommitteeMembers();
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
                        renderCommitteeMembers()
                    }
                })
            })
        }
    }
    renderCommitteeMembers()
}