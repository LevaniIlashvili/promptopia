"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

type Creator = {
  email: string;
  username: string;
  _id: string;
};

type Prompt = {
  _id: string;
  prompt: string;
  tag: string;
  creator: Creator;
};

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Prompt[];
  handleTagClick: any;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt: Prompt) => {
        console.log(prompt);
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    console.log("ckicked");
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
      setFilteredPrompts(data);
    };

    fetchPrompts();
  }, []);

  useEffect(() => {
    const filteredPrompts = prompts.filter(
      (prompt: Prompt) =>
        prompt.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        prompt.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        prompt.creator.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPrompts(filteredPrompts);
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      <PromptCardList data={filteredPrompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
