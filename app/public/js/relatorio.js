document.addEventListener('DOMContentLoaded', () => {
    const tabelaCorpo = document.querySelector('#tabelaRelatorios tbody');
    const formFiltro = document.getElementById('filtroRelatorio');

    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0];
    formFiltro.dataInicio.value = dataFormatada;
    formFiltro.dataFim.value = dataFormatada;

    function formatarData(dataISO) {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR');
    }

    async function buscarAgendamentos(dataInicio, dataFim) {
        try {
            const url = new URL('http://localhost:3300/api/relatorios');
            url.searchParams.append('dataInicio', dataInicio);
            url.searchParams.append('dataFim', dataFim);

            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                let errorMsg = 'Erro ao buscar agendamentos';
                try {
                    const errorData = await response.json();
                    if (errorData.error) errorMsg += `: ${errorData.error}`;
                } catch {}
                throw new Error(errorMsg);
            }

            const agendamentos = await response.json();
            return agendamentos;
        } catch (error) {
            alert('Não foi possível carregar os agendamentos. Veja o console para mais detalhes.');
            console.error(error);
            return [];
        }
    }

    function popularTabela(agendamentos) {
        tabelaCorpo.innerHTML = '';

        if (agendamentos.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 4;  // 4 colunas na tabela agora
            td.textContent = 'Nenhum agendamento encontrado.';
            td.style.textAlign = 'center';
            tr.appendChild(td);
            tabelaCorpo.appendChild(tr);
            return;
        }

        agendamentos.forEach(item => {
            const tr = document.createElement('tr');

            const tdData = document.createElement('td');
            tdData.textContent = formatarData(item.data || item.data_servico || '');
            tr.appendChild(tdData);

            const tdPet = document.createElement('td');
            tdPet.textContent = item.nomeCachorro || '';
            tr.appendChild(tdPet);

            const tdTutor = document.createElement('td');
            tdTutor.textContent = item.nomeTutor || '';
            tr.appendChild(tdTutor);

            const tdServico = document.createElement('td');
            tdServico.textContent = item.servico || '';
            tr.appendChild(tdServico);

            tabelaCorpo.appendChild(tr);
        });
    }

    formFiltro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dataInicio = formFiltro.dataInicio.value;
        const dataFim = formFiltro.dataFim.value;

        if (!dataInicio || !dataFim) {
            alert('Por favor, preencha as duas datas.');
            return;
        }

        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffDias = (fim - inicio) / (1000 * 60 * 60 * 24);

        if (diffDias < 0) {
            alert('A data de início deve ser anterior ou igual à data fim.');
            return;
        }

        if (diffDias > 30) {
            alert('O intervalo máximo permitido é de 30 dias.');
            return;
        }

        const agendamentos = await buscarAgendamentos(dataInicio, dataFim);
        popularTabela(agendamentos);
    });

    formFiltro.dispatchEvent(new Event('submit'));
});
