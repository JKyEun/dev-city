import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function GithubActivity({ data }) {
  const githubID = data.githubAddress && data.githubAddress.split('/')[3];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <div className="github_Grass">
        {isMounted && (
          <GitHubCalendar
            username={githubID}
            colorScheme="light"
            showWeekdayLabels
          ></GitHubCalendar>
        )}
      </div>
    </>
  );
}
