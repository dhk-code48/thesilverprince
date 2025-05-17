"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Heart,
  Coffee,
  Mail,
  Calendar,
  MapPin,
  Feather,
  BookMarked,
  Facebook,
  Twitter,
  Instagram,
  Twitch,
  PawPrintIcon as Patreon,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");

  const milestones = [
    {
      year: 2019,
      title: "Writing Journey Begins",
      description: "Started writing Pokemon: A Real Story",
    },
    {
      year: 2020,
      title: "First Publication",
      description: "Published on Webnovel and FanFiction.net",
    },
    {
      year: 2021,
      title: "Growing Audience",
      description: "Reached 50,000 readers milestone",
    },
    {
      year: 2022,
      title: "Expanded Universe",
      description: "Started planning additional stories in the same universe",
    },
    {
      year: 2023,
      title: "Website Launch",
      description:
        "Launched TheSilverPrince.com as the official home for all novels",
    },
  ];

  const skills = [
    { name: "Worldbuilding", level: 95 },
    { name: "Character Development", level: 90 },
    { name: "Plot Structure", level: 85 },
    { name: "Dialogue", level: 80 },
    { name: "Action Scenes", level: 92 },
  ];

  const faqs = [
    {
      question: "How often do you update chapters?",
      answer:
        "I aim to release new chapters weekly, typically on Fridays. However, during special events or holidays, the schedule might change. I always announce any changes in the News section.",
    },
    {
      question: "Will you write other stories besides Pokemon?",
      answer:
        "Yes! While Pokemon: A Real Story is my main focus right now, I have plans for other novels in different universes. I&apos;m particularly interested in exploring original fantasy worlds in the future.",
    },
    {
      question: "How can I support your work?",
      answer:
        "The best ways to support me are by reading my stories, leaving comments, and sharing with others who might enjoy them. If you&apos;d like to support me financially, you can become a patron on Patreon where you&apos;ll also get access to exclusive content.",
    },
    {
      question: "Do you take story suggestions?",
      answer:
        "I love hearing readers&apos; ideas! While I can&apos;t promise to incorporate every suggestion, I do consider them and sometimes they inspire new directions for the story. Feel free to share your thoughts in the comments or via email.",
    },
  ];

  return (
    <MaxWidthWrapper className="space-y-10">
      {/* Hero Section */}
      <section className="relative px-10 py-20 rounded-lg overflow-hidden">
        <div className="z-0 absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/5"></div>
        <div className="-top-24 -right-24 z-0 absolute bg-primary/60 opacity-50 rounded-full w-64 h-64"></div>
        <div className="-bottom-32 -left-32 z-0 absolute bg-primary/60 opacity-50 rounded-full w-96 h-96"></div>

        <div className="z-10 relative container">
          <div className="flex md:flex-row flex-col items-center gap-12">
            <motion.div
              className="flex justify-center md:w-1/2"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-lg rotate-3 transform"></div>
                <div className="relative shadow-xl border-4 border-white rounded-lg overflow-hidden">
                  <Image
                    src="/banner.jpg"
                    alt="Rahul Manandhar - The Silver Prince"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <motion.div
                  className="-right-6 -bottom-6 absolute bg-white shadow-lg p-3 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Feather className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Badge className="bg-primary/20 hover:bg-primary/30 mb-4 px-3 py-1 text-primary text-sm cursor-pointer">
                  Author & Creator
                </Badge>
              </motion.div>
              <motion.h1
                variants={item}
                className="mb-4 font-bold text-foreground text-4xl md:text-5xl"
              >
                The Silver Prince
              </motion.h1>
              <motion.p
                variants={item}
                className="mb-6 text-muted-foreground text-xl"
              >
                Crafting immersive fantasy worlds and reimagining familiar
                universes
              </motion.p>
              <motion.div
                variants={item}
                className="flex items-center gap-2 mb-3 text-muted-foreground"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>Based in Nepal</span>
              </motion.div>
              <motion.div
                variants={item}
                className="flex items-center gap-2 mb-3 text-muted-foreground"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span>Writing since 2019</span>
              </motion.div>
              <motion.div
                variants={item}
                className="flex items-center gap-2 mb-6 text-muted-foreground"
              >
                <BookMarked className="w-5 h-5 text-primary" />
                <span>Author of &quot;Pokemon: A Real Story&quot;</span>
              </motion.div>
              <motion.div variants={item} className="flex flex-wrap gap-3">
                <Button asChild className="bg-primary hover:bg-red-700">
                  <Link href="#contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href="https://www.patreon.com/TheSilverPrince1"
                    target="_blank"
                  >
                    <Patreon className="mr-2 w-4 h-4" />
                    Support on Patreon
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <div className="bg-card py-10 rounded-lg">
        <Tabs
          defaultValue="about"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-4xl">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="journey">My Journey</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about">
            <motion.div
              className="mx-auto max-w-4xl"
              initial="hidden"
              animate={activeTab === "about" ? "show" : "hidden"}
              variants={fadeIn}
            >
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 font-bold text-2xl">Who I Am</h2>
                  <p className="mb-4 text-muted-foreground">
                    I&apos;m Rahul Manandhar, writing under the pen name
                    &quot;The Silver Prince.&quot; Born and raised in Nepal,
                    I&apos;ve been passionate about storytelling since
                    childhood. My journey as a writer officially began in 2019
                    when I started publishing my fan fiction novel
                    &quot;Pokemon: A Real Story.&quot;
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    As a fiction novelist, I focus on fantasy and adventure,
                    blending familiar elements with my own imagination to create
                    unique reading experiences. I love exploring the deeper
                    aspects of familiar worlds and adding layers of complexity
                    that make readers think.
                  </p>
                  <p className="text-muted-foreground">
                    When I&apos;m not writing, I enjoy playing video games,
                    reading other fantasy novels, and exploring the beautiful
                    landscapes of Nepal. These experiences often find their way
                    into my writing, enriching the worlds I create.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 font-bold text-2xl">
                    My Writing Philosophy
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    I believe stories should be both entertaining and
                    thought-provoking. In my writing, I aim to create immersive
                    worlds that readers can get lost in, while also exploring
                    themes that resonate on a deeper level.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    My approach to fan fiction is to honor the original material
                    while adding my own perspective. With &quot;Pokemon: A Real
                    Story,&quot; I wanted to explore a more realistic take on
                    the Pokemon universe, examining the implications of a world
                    where such powerful creatures exist alongside humans.
                  </p>
                  <p className="text-muted-foreground">
                    I&apos;m dedicated to improving the reader&apos;s experience
                    with every chapter I write. Your support means everything to
                    me, and I reinvest it directly into creating better content
                    and more stories for you to enjoy.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-6 font-bold text-2xl text-center">
                  Connect With Me
                </h2>
                <div className="flex justify-center gap-6">
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <Twitter className="w-6 h-6 text-blue-400" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </motion.a>
                  <motion.a
                    href="https://twitch.tv"
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <Twitch className="w-6 h-6 text-purple-600" />
                  </motion.a>
                  <motion.a
                    href="https://www.patreon.com/TheSilverPrince1"
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <Patreon className="w-6 h-6 text-primary" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="journey">
            <motion.div
              className="mx-auto max-w-4xl"
              initial="hidden"
              animate={activeTab === "journey" ? "show" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="mb-12 font-bold text-3xl text-center">
                My Writing Journey
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="left-1/2 z-0 absolute bg-red-200 w-1 h-full -translate-x-1/2 transform"></div>

                {/* Timeline items */}
                <div className="z-10 relative">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      className={`mb-12 flex items-center ${
                        index % 2 === 0
                          ? "justify-start md:justify-end"
                          : "justify-start"
                      } relative`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div
                        className={`w-full md:w-5/12 ${
                          index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                        }`}
                      >
                        <Card className="hover:shadow-lg overflow-hidden transition-shadow">
                          <CardContent className="p-6">
                            <div className="mb-2 font-bold text-primary text-xl">
                              {milestone.year}
                            </div>
                            <h3 className="mb-2 font-bold text-lg">
                              {milestone.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {milestone.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="left-1/2 absolute flex justify-center items-center -translate-x-1/2 transform">
                        <div className="flex justify-center items-center bg-primary rounded-full w-8 h-8">
                          <div className="bg-white rounded-full w-4 h-4"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="mb-4 font-bold text-2xl">What&apos;s Next?</h3>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  I&apos;m currently working on expanding the Pokemon: A Real
                  Story universe with new chapters and potentially spin-off
                  stories. I&apos;m also exploring ideas for completely original
                  novels that I hope to share with you soon!
                </p>
                <Button className="bg-primary hover:bg-red-700 mt-6">
                  <Link href="/novels">Explore My Work</Link>
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="skills">
            <motion.div
              className="mx-auto max-w-4xl"
              initial="hidden"
              animate={activeTab === "skills" ? "show" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="mb-12 font-bold text-3xl text-center">
                Writing Skills & Expertise
              </h2>

              <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <h3 className="mb-6 font-bold text-xl">
                    Core Writing Skills
                  </h3>

                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="mb-6"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-2"
                        indicatorClassName="bg-primary"
                      />
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h3 className="mb-6 font-bold text-xl">Areas of Expertise</h3>

                  <div className="gap-4 grid grid-cols-2">
                    <motion.div
                      className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-all hover:-translate-y-1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      <div className="flex justify-center items-center bg-red-100 mb-4 rounded-full w-12 h-12">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="mb-2 font-bold">Fan Fiction</h4>
                      <p className="text-muted-foreground text-sm">
                        Reimagining existing universes with fresh perspectives
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-all hover:-translate-y-1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="flex justify-center items-center bg-red-100 mb-4 rounded-full w-12 h-12">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="mb-2 font-bold">Fantasy</h4>
                      <p className="text-muted-foreground text-sm">
                        Creating immersive worlds with rich lore and magic
                        systems
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-all hover:-translate-y-1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <div className="flex justify-center items-center bg-red-100 mb-4 rounded-full w-12 h-12">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="mb-2 font-bold">Character Development</h4>
                      <p className="text-muted-foreground text-sm">
                        Crafting complex, relatable characters with depth
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-all hover:-translate-y-1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <div className="flex justify-center items-center bg-red-100 mb-4 rounded-full w-12 h-12">
                        <Coffee className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="mb-2 font-bold">Worldbuilding</h4>
                      <p className="text-muted-foreground text-sm">
                        Designing detailed settings that feel alive and
                        authentic
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                className="bg-red-50 mt-16 p-8 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="mb-4 font-bold text-xl text-center">
                  My Creative Process
                </h3>
                <p className="mb-4 text-gray-600">
                  My writing typically begins with a spark of inspiration – a
                  &quot;what if&quot; question or an interesting character
                  concept. From there, I develop an outline, focusing first on
                  the major plot points and character arcs. I then dive into the
                  first draft, letting creativity flow while keeping the
                  structure in mind.
                </p>
                <p className="text-gray-600">
                  After completing a draft, I revise extensively, focusing on
                  pacing, character consistency, and worldbuilding details. I
                  often incorporate reader feedback between chapters, which
                  helps me refine the story as it progresses. This iterative
                  process allows me to deliver the best possible experience for
                  my readers.
                </p>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="faq">
            <motion.div
              className="mx-auto max-w-3xl"
              initial="hidden"
              animate={activeTab === "faq" ? "show" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="mb-12 font-bold text-3xl text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-6">
                      <h3 className="mb-3 font-bold text-lg">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="mb-4 font-bold text-xl">
                  Have Another Question?
                </h3>
                <p className="mb-6 text-gray-600">
                  If you didn&apos;t find the answer you were looking for, feel
                  free to reach out directly!
                </p>
                <Button asChild className="bg-primary hover:bg-red-700">
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Section */}
      <div className="bg-background">
        <MaxWidthWrapper>
          <motion.div
            className="mx-auto mb-12 max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-bold text-3xl">Get in Touch</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Have questions, suggestions, or just want to say hello? I&apos;d
              love to hear from you! Fill out the form below or reach out
              through social media.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <motion.div
              className="bg-card shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8">
                <form className="space-y-6">
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 font-medium text-muted-foreground text-sm"
                      >
                        Your Name
                      </label>
                      <Input type="text" id="name" placeholder="John Doe" />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 font-medium text-muted-foreground text-sm"
                      >
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 font-medium text-muted-foreground text-sm"
                    >
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      placeholder="How can I help you?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 font-medium text-muted-foreground text-sm"
                    >
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Write your message here..."
                    ></Textarea>
                  </div>
                  <div>
                    <Button className="w-full">Send Message</Button>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              className="flex md:flex-row flex-col justify-center items-center gap-8 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-primary/20 rounded-full w-10 h-10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">
                  contact@thesilverprince.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-primary/20 rounded-full w-10 h-10">
                  <Patreon className="w-5 h-5 text-primary" />
                </div>
                <a
                  href="https://www.patreon.com/TheSilverPrince1"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                  rel="noreferrer"
                >
                  patreon.com/TheSilverPrince1
                </a>
              </div>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  );
}

/*


      <Head>
        <title>About | The Silver Prince | Rahul Manandhar</title>
        <meta
          name="description"
          content="Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He
            is a light novel writer and has been writing since 2019. He is
            famous for his novel ‘Pokemon- a real story’ which has been
            published in webnovels, Fanfiction.net and AO3."
        ></meta>
      </Head>

*/
