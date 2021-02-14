const search = document.getElementById('search'),
    state_list = document.getElementById('state-list')


    // search state.json and filter it

    const searchState = async searchText => {
        const result = await fetch('../states.json');
        const states = await result.json();

        // get matches current text input
        let matches = states.filter(state => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return state.name.match(regex) || state.abbr.match(regex);
        });

        if(searchText.length === 0){
            matches = [];
            state_list.innerHTML = '';
        }

        outputHtml(matches);
    };

    // Show results in Html
    const outputHtml = matches => {
        if(matches.length > 0){
            const html = matches.map(match => `
            <div class="card card-body bg-dark text-white-50 mb-4 mt-4">
                <h5>
                ${match.name} (${match.abbr})
                <span class="text-primary">${match.capital}</span> 
                </h5>
                <small>-- Lat: ${match.lat} / Long: ${match.long} --</small>
            </div>
            `).join('');

            console.log(html);
            state_list.innerHTML = html;
        }
    };

    search.addEventListener('input', () => searchState(search.value));