"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, ChevronDown } from "lucide-react"
import ContactButton from "@/components/contact-button"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

export default function BlogPage() {
  const [showTableOfContents, setShowTableOfContents] = useState(false)
  const [activeSection, setActiveSection] = useState("intro")

  const sections = [
    {
      id: "intro",
      title: "Introduction to the World of AI",
      content: [
        "Artificial Intelligence has revolutionized how we interact with technology, process information, and solve complex problems. At the heart of modern AI systems are sophisticated models that can recognize patterns, generate content, and make predictions with remarkable accuracy.",
        "The field of AI has seen exponential growth in recent years, with breakthroughs in natural language processing, computer vision, and reinforcement learning. These advancements have been driven by improvements in computational power, algorithm design, and the availability of vast datasets.",
        "However, creating effective AI models involves critical decisions about whether to train models from scratch or fine-tune existing ones. This choice significantly impacts development time, resource requirements, and model performance. Understanding the nuances of these approaches is essential for AI practitioners and organizations looking to implement AI solutions effectively.",
      ],
    },
    {
      id: "fine-tuning",
      title: "What is Fine-tuning?",
      content: [
        "Fine-tuning is the process of taking a pre-trained model and adapting it to a specific task or domain. This approach leverages the knowledge already encoded in the model's parameters, which were learned during initial training on large datasets.",
        "Think of fine-tuning as teaching a graduate student a specialized skill. They already understand the fundamentals—you're just helping them apply that knowledge to a specific context.",
        "The technical process involves taking a model that has been trained on a large corpus of data (like GPT-4 trained on internet text) and further training it on a smaller, task-specific dataset. During fine-tuning, most of the model's parameters are preserved, while making small adjustments to optimize performance on the target task.",
        "Fine-tuning typically involves lower learning rates than initial training to prevent catastrophic forgetting, where the model loses the general knowledge it acquired during pre-training.",
      ],
    },
    {
      id: "why-fine-tune",
      title: "Why Fine-tune AI Models?",
      content: [
        "Fine-tuning offers several compelling advantages that make it an attractive option for many AI applications:",
        "Resource efficiency: Fine-tuning requires significantly less computational power and time than training from scratch. While training a large language model from scratch might require hundreds of GPUs running for months, fine-tuning can often be accomplished with a single GPU in hours or days.",
        "Less data needed: Fine-tuning can achieve good results with smaller domain-specific datasets, often just thousands or tens of thousands of examples, compared to the billions of examples needed for training from scratch.",
        "Transfer learning: Fine-tuning leverages knowledge from the pre-training phase, allowing the model to apply general patterns and relationships to specific tasks. This is particularly valuable in domains where labeled data is scarce.",
        "Faster iteration: The reduced training time enables quicker experimentation and iteration, allowing developers to test different approaches and hyperparameters more efficiently.",
        "Real-world example: OpenAI's GPT models are frequently fine-tuned for specific applications like customer service bots, specialized content generation, or domain-specific assistants. For instance, a healthcare company might fine-tune GPT-4 on medical literature to create an assistant that can provide more accurate medical information while retaining its general language capabilities.",
        "Another example is Anthropic's Claude model, which was fine-tuned with constitutional AI techniques to follow specific guidelines and exhibit particular behaviors, making it more helpful, harmless, and honest in its responses.",
      ],
    },
    {
      id: "training",
      title: "What is Training from Scratch?",
      content: [
        "Training from scratch involves building and training a model with randomly initialized parameters, without leveraging pre-existing models. This approach requires substantial data and computational resources but offers complete control over the model architecture and learning process.",
        "It's like raising a child from birth—you have complete influence over their development, but it requires significant time and resources.",
        "The process begins with defining the model architecture, which could range from simple neural networks to complex transformer models with billions of parameters. The parameters are initialized randomly, and the model learns patterns exclusively from the training data provided.",
        "Training typically involves optimizing a loss function through techniques like stochastic gradient descent, where the model's parameters are iteratively updated to minimize the difference between its predictions and the ground truth.",
        "This approach requires careful consideration of hyperparameters, regularization techniques, and optimization strategies to ensure the model generalizes well to unseen data and doesn't simply memorize the training examples.",
      ],
    },
    {
      id: "why-train",
      title: "Why Train AI Models from Scratch?",
      content: [
        "Training from scratch is beneficial in several scenarios that justify the additional resources and time required:",
        "Novel domains: When working in areas with no suitable pre-trained models, training from scratch may be the only viable option. For example, if you're developing models for a specialized scientific domain with unique data characteristics, existing pre-trained models might not capture the relevant patterns.",
        "Specialized architectures: When you need a custom model design for specific requirements, training from scratch allows you to optimize the architecture for your particular use case. This might involve novel neural network structures or domain-specific inductive biases.",
        "Complete control: Training from scratch provides full control over every aspect of the model's behavior and learning process. This is crucial for applications with strict performance requirements or where explainability is essential.",
        "Intellectual property considerations: In some cases, organizations may prefer to train models from scratch to avoid licensing issues or dependencies on third-party models.",
        "Real-world example: DeepMind trained AlphaGo from scratch to master the game of Go, as the unique requirements of the game demanded a specialized approach. The model combined reinforcement learning with Monte Carlo tree search to develop strategies that surpassed human experts.",
        "Similarly, companies developing AI for specialized medical imaging often train custom models from scratch to address the unique characteristics of their data, such as specific imaging modalities or rare pathologies that aren't well-represented in general computer vision models.",
      ],
    },
    {
      id: "use-cases",
      title: "Use Cases: When to Choose Which Approach",
      content: [
        "The decision between fine-tuning and training from scratch should be guided by your specific requirements, resources, and constraints. Here's a practical guide to help you choose the right approach:",
        "Choose fine-tuning when:",
        "• You have limited computational resources or budget constraints",
        "• Your task is similar to what existing models can do (e.g., language understanding, image classification)",
        "• You have a small dataset specific to your domain (hundreds to thousands of examples)",
        "• You need to deploy quickly and iterate rapidly",
        "• You want to leverage the general knowledge captured in pre-trained models",
        "Example: A startup creating a specialized legal document assistant would likely fine-tune a model like GPT-4 on legal texts rather than training from scratch. This approach would allow them to create a product that understands legal terminology and concepts without requiring the massive resources needed to train a large language model from the ground up.",
        "Choose training from scratch when:",
        "• Your task is fundamentally different from what existing models do",
        "• You have unique architectural requirements that aren't met by available pre-trained models",
        "• You have access to substantial computational resources and time",
        "• You need complete control over the model's behavior and learning process",
        "• You have a large, high-quality dataset specific to your domain",
        "• Privacy or intellectual property concerns prevent using pre-trained models",
        "Example: A research lab developing AI for protein folding prediction might train specialized models from scratch due to the unique nature of the problem and data. The specific requirements of modeling protein structures and interactions might not be well-captured by general-purpose pre-trained models, justifying the investment in training from scratch.",
        "In practice, many successful AI applications use a hybrid approach, combining elements of both strategies. For instance, you might start with a pre-trained model but replace or modify certain components to better suit your specific requirements.",
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion: Balancing Efficiency and Specialization",
      content: [
        "The choice between fine-tuning and training from scratch represents a fundamental tradeoff in AI development: efficiency versus specialization. Fine-tuning offers a resource-efficient path to creating capable AI systems by leveraging existing knowledge, while training from scratch provides maximum flexibility and control at the cost of greater resource requirements.",
        "As AI continues to evolve, we're seeing the emergence of more sophisticated approaches that blur the lines between these two paradigms. Techniques like parameter-efficient fine-tuning (e.g., LoRA, adapters) allow for customization of large models with minimal computational overhead, while modular architectures enable combining pre-trained components in novel ways.",
        "Ultimately, the best approach depends on your specific context, including your technical requirements, available resources, and business constraints. By understanding the tradeoffs involved, you can make informed decisions that maximize the value of AI for your particular use case.",
        "Whether you choose to fine-tune or train from scratch, the key is to align your technical approach with your goals and constraints, ensuring that your AI development efforts deliver meaningful results efficiently.",
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better UX

      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <main className="min-h-screen bg-white font-['Inter',sans-serif] text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-indigo-600 font-bold text-xl">AI Insights</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Articles
              </a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                About
              </a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-sm text-indigo-600 font-medium mb-4">
              <span>AI & Machine Learning</span>
              <span>•</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>April 1, 2025</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              The Art of AI Refinement: Fine-tuning vs Training Models from Scratch
            </h1>

            <p className="text-xl text-slate-700 mb-8">
              Explore the critical decision between leveraging existing AI models and building your own from the ground
              up—and how to choose the right approach for your specific needs.
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Geetansh Mehta"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  By{" "}
                  <Link
                    href="https://www.linkedin.com/in/geetansh-mehta-790538259/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Geetansh Mehta
                  </Link>
                </p>
                <p className="text-sm text-slate-500">AI Researcher & Technical Writer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of contents - Mobile */}
      <div className="md:hidden sticky top-16 z-10 bg-white border-b border-slate-200 shadow-sm">
        <button
          onClick={() => setShowTableOfContents(!showTableOfContents)}
          className="flex items-center justify-between w-full px-4 py-3 text-left"
        >
          <span className="font-medium">Table of Contents</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${showTableOfContents ? "transform rotate-180" : ""}`}
          />
        </button>

        {showTableOfContents && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
            <ul className="space-y-2 pb-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`block py-1 text-sm ${activeSection === section.id ? "text-indigo-600 font-medium" : "text-slate-600"}`}
                    onClick={() => setShowTableOfContents(false)}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Table of contents - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Table of Contents</h3>
              <nav className="mt-4">
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`block text-sm ${activeSection === section.id ? "text-indigo-600 font-medium" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Article content */}
          <div className="mt-6 lg:mt-0 lg:col-span-9">
            <div className="prose prose-slate prose-lg max-w-none">
              {sections.map((section, index) => (
                <AnimatedSection key={section.id} index={index} id={section.id}>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6" id={section.id}>
                    {section.title}
                  </h2>
                  {section.content.map((paragraph, i) => {
                    if (paragraph.startsWith("•")) {
                      return (
                        <ul key={i} className="list-disc pl-6 mb-4 space-y-2">
                          <li className="text-slate-700">{paragraph.substring(2)}</li>
                        </ul>
                      )
                    } else if (paragraph.startsWith("Choose")) {
                      return (
                        <h3 key={i} className="text-xl font-semibold text-slate-900 mt-6 mb-4">
                          {paragraph}
                        </h3>
                      )
                    } else if (paragraph.startsWith("Example:")) {
                      return (
                        <div key={i} className="bg-slate-50 border-l-4 border-indigo-500 p-4 my-6">
                          <p className="italic text-slate-700">{paragraph}</p>
                        </div>
                      )
                    } else if (paragraph.startsWith("Real-world example:")) {
                      return (
                        <div key={i} className="bg-slate-50 border-l-4 border-indigo-500 p-4 my-6">
                          <p className="italic text-slate-700">{paragraph}</p>
                        </div>
                      )
                    } else {
                      return (
                        <p key={i} className="mb-6 text-slate-700 leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    }
                  })}

                  {index < sections.length - 1 && <div className="border-b border-slate-200 my-12"></div>}
                </AnimatedSection>
              ))}
            </div>

            {/* Author bio */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Geetansh Mehta"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">About the Author</h3>
                  <p className="mt-1 text-slate-700">
                    Geetansh Mehta is an AI researcher and technical writer specializing in machine learning systems and
                    natural language processing. With experience in both academic research and industry applications, he
                    focuses on making complex AI concepts accessible to practitioners.
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <Link
                      href="https://www.linkedin.com/in/geetansh-mehta-790538259/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                    >
                      <span>LinkedIn</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    <ContactButton email="geetanshmehta4@outlook.com" />
                  </div>
                </div>
              </div>
            </div>

            {/* Related articles */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group">
                  <div className="aspect-w-16 aspect-h-9 mb-4 bg-slate-100 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-400 group-hover:text-indigo-500 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Prompt Engineering: The Key to Effective AI Interactions
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Learn how to craft effective prompts that get the best results from large language models.
                  </p>
                </div>
                <div className="group">
                  <div className="aspect-w-16 aspect-h-9 mb-4 bg-slate-100 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-400 group-hover:text-indigo-500 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    The Ethics of AI: Balancing Innovation and Responsibility
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Exploring the ethical considerations in AI development and deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-indigo-50 border-t border-indigo-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Stay updated with AI insights</h2>
              <p className="text-lg text-slate-700 mb-6">
                Get the latest articles on AI development, machine learning techniques, and industry trends delivered to
                your inbox.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-slate-300 shadow-sm placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-sm text-slate-500">
                We care about your data. Read our{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-white font-bold text-xl mb-4">AI Insights</div>
              <p className="mb-4">
                Exploring the frontiers of artificial intelligence and machine learning through in-depth articles,
                tutorials, and analysis.
              </p>
              <p className="text-sm">© 2025 AI Insights. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Glossary
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function AnimatedSection({ children, index, id }: { children: React.ReactNode; index: number; id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  )
}

