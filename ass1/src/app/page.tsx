"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { allQuotes, Quote } from "@/data/quotes";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Star, Target, Heart, Book, Sun, Moon, Copy, Check } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";
import type { Engine } from "tsparticles-engine";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme-dependent rendering only happens on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const handleGenerateQuotes = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (!topic) {
        setQuotes([]);
        setIsLoading(false);
        return;
      }

      // Use word boundary regex for more precise matching
      const searchRegex = new RegExp(`\\b${topic.toLowerCase()}\\b`);
      const filtered = allQuotes.filter((quote) =>
        searchRegex.test(quote.topic.toLowerCase())
      );

      if (filtered.length === 0) {
        // Generate random quotes if no matches found
        const shuffledQuotes = [...allQuotes].sort(() => Math.random() - 0.5);
        setQuotes(shuffledQuotes.slice(0, 3));
        setError(`No quotes found for "${topic}". Showing random quotes instead.`);
      } else {
        setQuotes(filtered.slice(0, 3));
      }

      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleGenerateQuotes();
    }
  };

  const handleCopy = (quote: Quote, index: number) => {
    const textToCopy = `"${quote.text}" - ${quote.author}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Function to select an icon based on the quote's topic
  const getTopicIcon = (topic: string) => {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes("wisdom")) return <Star className="w-6 h-6 text-primary/90 group-hover:animate-pulse" />;
    if (lowerTopic.includes("success")) return <Target className="w-6 h-6 text-primary/90 group-hover:animate-pulse" />;
    if (lowerTopic.includes("love")) return <Heart className="w-6 h-6 text-primary/90 group-hover:animate-pulse" />;
    if (lowerTopic.includes("life")) return <Sun className="w-6 h-6 text-primary/90 group-hover:animate-pulse" />;
    return <Book className="w-6 h-6 text-primary/90 group-hover:animate-pulse" />;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden">
      {mounted ? (
        <Button
          variant="default"
          size="icon"
          className="absolute top-4 right-4 bg-primary/80 hover:bg-primary text-primary-foreground border border-primary/30 shadow-lg z-20"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      ) : (
        <Button
          variant="default"
          size="icon"
          className="absolute top-4 right-4 bg-primary/80 text-primary-foreground border border-primary/30 shadow-lg z-20"
          disabled
        >
          <Sun className="w-5 h-5" />
        </Button>
      )}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#ffffff", "#3a0ca3", "#23d5ab"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />
      <div className="w-full max-w-3xl z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Quote Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover wisdom, one quote at a time.
          </p>
        </motion.div>

        <div className="flex w-full items-center space-x-3 mb-12 p-2 rounded-lg bg-black/10 backdrop-blur-sm border border-white/10">
          <Input
            type="text"
            placeholder="e.g., Wisdom, Success, Life"
            className="flex-grow bg-transparent text-lg text-foreground placeholder-muted-foreground border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            type="submit"
            onClick={handleGenerateQuotes}
            size="lg"
            className="bg-primary/90 hover:bg-primary transition-all duration-300"
            disabled={isLoading}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="h-5 w-5 border-2 border-dashed rounded-full animate-spin border-primary-foreground"></div>
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center mb-6 text-red-400 bg-red-900/20 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {quotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {quotes.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group"
                >
                  <Card className="h-full bg-gradient-to-br from-black/20 to-primary/10 backdrop-blur-lg border border-primary/30 hover:border-primary/70 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 hover:-rotate-1 transform-gpu">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-3">
                        {getTopicIcon(quote.topic)}
                        <CardTitle className="text-primary/90 text-lg font-semibold">{quote.topic}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary/90 hover:text-primary hover:bg-accent/20"
                        onClick={() => handleCopy(quote, index)}
                        title="Copy to clipboard"
                      >
                        <AnimatePresence mode="wait">
                          {copiedIndex === index ? (
                            <motion.div
                              key="check"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              <Check className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              <Copy className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground/90 text-base italic leading-relaxed">&quot;{quote.text}&quot;</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <div className="relative">
                        <p className="text-sm text-primary/90 font-medium bg-accent/20 px-3 py-1 rounded-full">
                          - {quote.author}
                        </p>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}