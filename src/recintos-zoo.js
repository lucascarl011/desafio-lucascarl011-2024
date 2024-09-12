class RecintosZoo {

    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['MACACO'] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
        { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['GAZELA'] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['LEAO'] }
      ];
      this.animais = {
        LEAO: { tamanho: 3, bioma: 'savana' },
        LEOPARDO: { tamanho: 2, bioma: 'savana' },
        CROCODILO: { tamanho: 3, bioma: 'rio' },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
        GAZELA: { tamanho: 2, bioma: 'savana' },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido', recintosViaveis: false };
      }
      if (quantidade <= 0) {
        return { erro: 'Quantidade inválida', recintosViaveis: false };
      }
  
      const recintosViaveis = this.recintos.filter(recinto => {
        const biomaValido = Array.isArray(this.animais[animal].bioma)
          ? this.animais[animal].bioma.some(bioma => recinto.bioma.includes(bioma))
          : recinto.bioma === this.animais[animal].bioma;
        const espacoSuficiente = recinto.tamanhoTotal - this.calculaTamanhoOcupado(recinto.animaisExistentes) - (quantidade * this.animais[animal].tamanho) >= 0;
        const compativelComAnimaisExistentes = this.compatilidadeAnimais(animal, recinto.animaisExistentes, quantidade, recinto.bioma);
  
        return biomaValido && espacoSuficiente && compativelComAnimaisExistentes;
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável', recintosViaveis: false };
      }
  
      return {
        erro: false,
        recintosViaveis: recintosViaveis.map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - this.calculaTamanhoOcupado(recinto.animaisExistentes) - (quantidade * this.animais[animal].tamanho)} total: ${recinto.tamanhoTotal})`)
      };
    }
  
    calculaTamanhoOcupado(animais) {
        let tamanhoOcupado = 0;
        if (animais.length > 0) {
          tamanhoOcupado += animais.reduce((acc, animal) => acc + this.animais[animal].tamanho, 0);
          if (animais.length > 1) { // Adiciona espaço extra somente se tiver mais de uma espécie
            tamanhoOcupado += animais.length - 1; 
          }
        }
        return tamanhoOcupado;
      }
  
    compatilidadeAnimais(animal, animaisExistentes, quantidade, bioma) {
      if (animal === 'HIPOPOTAMO' && !bioma.includes('rio')) {
        return false;
      }
      if (animal === 'MACACO' && animaisExistentes.length === 0) {
        return false;
      }
      if (animal === 'LEAO' || animal === 'LEOPARDO') {
        if (animaisExistentes.length > 0 && animaisExistentes.some(a => a !== animal)) {
          return false;
        }
      }
      return true;
    }
  }
  
  export { RecintosZoo as RecintosZoo };