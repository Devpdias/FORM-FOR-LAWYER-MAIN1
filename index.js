document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.1,
        }
    );


    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
});

const formContato = document.getElementById('formContato');
    
formContato.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const mensagem = document.getElementById('mensagem').value;

    try {
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: 'pedrohenriqueherculanodias@gmail.com', // Substitua pelo seu email
                subject: `Nova mensagem de contato: ${nome}`,
                text: `
                    Nome: ${nome}
                    Email: ${email}
                    Celular: ${celular}
                    Mensagem: ${mensagem}
                `,
                html: `
                    <h3>Nova mensagem de contato</h3>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Celular:</strong> ${celular}</p>
                    <p><strong>Mensagem:</strong><br>${mensagem}</p>
                `,
            }),
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            formContato.reset();
        } else {
            const errorMessage = await response.text();
            alert('Erro: ' + errorMessage);
        }
    } catch (err) {
        alert('Erro ao enviar o formulário: ' + err.message);
    }
});



