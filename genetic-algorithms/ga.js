class GeneticAlgorithm {
  constructor(populationSize, mutationRate) {
    GeneticAlgorithm.target = 'genetik algoritma';
    GeneticAlgorithm.chars = 'abcdefghijklmnopqrstuvwxyz ';
    GeneticAlgorithm.mutationRate = mutationRate;
    this.populationSize = populationSize;
    this.population = [];

    for(let i = 0; i < populationSize; ++i) {
      this.population[i] = new Chromosome(this.target);
    }
  }

  evolve() {
    let fitness = [];
    for(let i = 0; i < this.populationSize; ++i) {
      fitness[i] = this.population[i].getFitness();
    }

    let bestTwo = this.getBestTwo();
    let fittest1 = bestTwo[0];
    let fittest2 = bestTwo[1];

    let child = this.population[fittest1].crossover(this.population[fittest2]);
    for(let i = 0; i < this.populationSize; ++i) {
      this.population[i] = child.mutate();
    }
  }

  getBestTwo() {
    let fitness = [];
    for(let i = 0; i < this.populationSize; ++i) {
      fitness[i] = this.population[i].getFitness();
    }

    let fittest1 = 0;
    let fittest2 = 1;
    for(let i = 0; i < this.populationSize; ++i) {
      if(fitness[i] < fitness[fittest2]) {
        fittest2 = i;
      }

      if(fitness[fittest2] < fitness[fittest1]) {
          let temp = fittest1;
          fittest1 = fittest2;
          fittest2 = temp;
      }
    }

    return [fittest1, fittest2];
  }

  isProblemSolved() {
    let target = GeneticAlgorithm.target;

    for(let i = 0; i < this.populationSize; ++i) {
      if(this.population[i].gene == target) {
        return i;
      }
    }

    return -1;
  }

  static getRandomChromosome() {
    let chars = GeneticAlgorithm.chars;
    let target = GeneticAlgorithm.target;

    let word = '';
    for(let i = 0; i < target.length; ++i) {
      let rnd = Math.floor(Math.random() * chars.length);
      word += chars[rnd];
    }
    return word;
  }
}
