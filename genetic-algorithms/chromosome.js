class Chromosome {

  constructor(target) {
    this.gene = GeneticAlgorithm.getRandomChromosome();
  }

  getFitness() {
    let target = GeneticAlgorithm.target;

    let fitness = 0;
    for(let i = 0; i < target.length; ++i) {
      fitness += Math.abs(target.charCodeAt(i) - this.gene.charCodeAt(i));
    }
    return fitness;
  }

  mutate() {
    let chars = GeneticAlgorithm.chars;
    let mutationRate = GeneticAlgorithm.mutationRate;

    let mutatedGene = '';
    for(let i = 0; i < this.gene.length; ++i) {
      if(Math.random() < mutationRate) {
        let rnd = Math.floor(Math.random() * chars.length);
        mutatedGene += chars[rnd];
      } else {
        mutatedGene += this.gene[i];
      }
    }

    let mutated = new Chromosome();
    mutated.gene = mutatedGene;
    return mutated;
  }

  crossover(other) {
    let crossoverGene = '';
    let rnd = Math.floor(Math.random() * this.gene.length);

    for(let i = 0; i < this.gene.length; ++i) {
      if(i < rnd) {
        crossoverGene += this.gene[i];
      } else {
        crossoverGene += other.gene[i];
      }
    }

    let crossover = new Chromosome();
    crossover.gene = crossoverGene;
    return crossover;
  }
}
