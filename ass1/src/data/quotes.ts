// src/data/quotes.ts

export interface Quote {
  topic: string;
  text: string;
  author: string;
}

export const allQuotes: Quote[] = [
  // Wisdom Quotes
  { topic: "Wisdom", text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { topic: "Wisdom", text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { topic: "Wisdom", text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },

  // Success Quotes
  { topic: "Success", text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { topic: "Success", text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
  { topic: "Success", text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },

  // Life Quotes
  { topic: "Life", text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { topic: "Life", text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { topic: "Life", text: "Get busy living or get busy dying.", author: "Stephen King" },

  // Happiness Quotes
  { topic: "Happiness", text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { topic: "Happiness", text: "The most important thing is to enjoy your life—to be happy—it's all that matters.", author: "Audrey Hepburn" },
  { topic: "Happiness", text: "Happiness is a warm puppy.", author: "Charles M. Schulz" },
];