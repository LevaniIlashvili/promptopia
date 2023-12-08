"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

type Creator = {
  email: string;
  password: string;
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
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt: Prompt) => {
        console.log(prompt);
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handtleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };

    fetchPrompts();
  }, []);

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

      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
