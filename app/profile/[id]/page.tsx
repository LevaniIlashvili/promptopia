"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [prompts, setPrompts] = useState([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPrompts(data);
    };

    if (params.id) fetchPrompts();
  }, [params.id]);

  return (
    <Profile
      name={name}
      desc={`Welcome to ${name}'s personalized profile page`}
      data={prompts}
    />
  );
};

export default UserProfile;
