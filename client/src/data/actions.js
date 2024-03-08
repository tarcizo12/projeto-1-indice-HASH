const getStatics = async () =>{
    const response = await fetch('http://localhost:3000/statics');
    const data = await response.json();

    return data
}

const getPage = async (pageNumber) =>{
    try {
        const response = await fetch(
          `http://localhost:3000/page/${pageNumber}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.ok) {
          const result = await response.json();
          const page = result.values.page;
          
          return page
        } else {
          console.error('Erro ao enviar solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
};

const getByValueWithBucketSearch = async (value) =>{
    try {
        const response = await fetch(
          `http://localhost:3000/findByValue/${value}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.ok) {
          const result = await response.json();
          const pageNumber = result.values.numberPageOfValue;
          
          return pageNumber
        } else {
          console.error('Erro ao enviar solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
}

const setResetLoad = async () => {
    try {
      const response = await fetch('http://localhost:3000/reset', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (result.values && result.values.reset !== undefined) {
        const res = result.values.reset;
        return res;
      } else {
        console.error('Propriedade reset não está definida na resposta:', result);
        return null; 
      }
    } catch (error) {
      console.error('Erro ao iniciar reload de página:', error);
      throw error; 
    }
  };
  

const getByValueWithTableScanSearch = async (value) =>{
    const response = await fetch(`http://localhost:3000/tableScan/${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    
    if (response.ok) {
        const result = await response.json();
        const visitedPages = result.values.visitedPages;

        return visitedPages;
    } else {
      console.error('Erro ao enviar solicitação:', response.statusText);
    }
    
}


export const Actions = {
    getStatics,
    setResetLoad,
    getPage,
    getByValueWithBucketSearch,
    getByValueWithTableScanSearch
}