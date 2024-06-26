// script.js

document.addEventListener('DOMContentLoaded', function() {
    const githubUsername = 'dedeoliv';
    const jsonServerUrl = 'https://3scc7n2s-1.brs.devtunnels.ms/';

    // Função para buscar dados do GitHub
    function fetchGitHubData() {
        fetch(`https://api.github.com/users/${dedeoliv}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#secao1 .profile img').src = data.avatar_url;
                document.querySelector('#secao1 .profile-info h3').textContent = data.name;
                document.querySelector('#secao1 .profile-info p').textContent = data.bio;

                // Atualiza os botões de contato
                document.querySelector('#secao1 .contact-buttons a[href^="mailto:"]').href = `mailto:${data.email}`;
                document.querySelector('#secao1 .contact-buttons a[href^="https://www.linkedin.com"]').href = data.blog;
            })
            .catch(error => console.error('Erro ao buscar dados do GitHub:', error));

        fetch(`https://api.github.com/users/${githubUsername}/repos`)
            .then(response => response.json())
            .then(repos => {
                const reposContainer = document.querySelector('#repos-container');
                reposContainer.innerHTML = ''; // Limpa o conteúdo anterior

                repos.forEach(repo => {
                    const repoCard = `
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${repo.name}</h5>
                                    <p class="card-text">${repo.description}</p>
                                    <a href="${repo.html_url}" class="btn btn-primary">Ver Repositório</a>
                                </div>
                            </div>
                        </div>
                    `;
                    reposContainer.innerHTML += repoCard;
                });
            })
            .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));
    }

    // Função para buscar dados do JSON Server
    function fetchJSONServerData() {
        fetch(`${jsonServerUrl}/content`)
            .then(response => response.json())
            .then(contents => {
                const contentContainer = document.querySelector('#content-container');
                contentContainer.innerHTML = ''; // Limpa o conteúdo anterior

                contents.forEach(content => {
                    const contentItem = `
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${content.imageUrl}" class="card-img-top" alt="${content.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${content.title}</h5>
                                    <p class="card-text">${content.description}</p>
                                    <a href="${content.url}" class="btn btn-secondary">Ver Conteúdo</a>
                                </div>
                            </div>
                        </div>
                    `;
                    contentContainer.innerHTML += contentItem;
                });
            })
            .catch(error => console.error('Erro ao buscar conteúdo:', error));

        fetch(`${jsonServerUrl}/colleagues`)
            .then(response => response.json())
            .then(colleagues => {
                const colleaguesContainer = document.querySelector('#colleagues-container');
                colleaguesContainer.innerHTML = ''; // Limpa o conteúdo anterior

                colleagues.forEach(colleague => {
                    const colleagueCard = `
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${colleague.photoUrl}" class="card-img-top" alt="${colleague.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${colleague.name}</h5>
                                    <a href="${colleague.githubProfile}" class="btn btn-primary">Ver Perfil</a>
                                </div>
                            </div>
                        </div>
                    `;
                    colleaguesContainer.innerHTML += colleagueCard;
                });
            })
            .catch(error => console.error('Erro ao buscar colegas de trabalho:', error));
    }

    // Chama as funções para buscar dados
    fetchGitHubData();
    fetchJSONServerData();
});
