import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';

export default function GithubActivity({ data }) {
  const githubID = data.githubAddress && data.githubAddress.split('/')[3];
  const [isMounted, setIsMounted] = useState(false);
  const [gitValidate, setGitValidate] = useState(false);
  const [gitValidateLoading, setGitValidateLoading] = useState(true);

  const gitValidation = async () => {
    try {
      await axios.get(
        `https://github-contributions-api.jogruber.de/v4/${githubID}?y=last`,
      );
      setGitValidate(true);
    } catch (err) {
      setGitValidate(false);
    }
    setGitValidateLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
    gitValidation();
  }, []);
  return (
    <>
      {!gitValidateLoading &&
        (gitValidate ? (
          <div className="github_Grass">
            {isMounted && (
              <GitHubCalendar
                username={githubID}
                colorScheme="light"
                showWeekdayLabels
              ></GitHubCalendar>
            )}
          </div>
        ) : (
          <div className="no_github">
            <p>올바른 깃허브 주소를 등록해주세요!</p>
            <Link to={'/mycity'}>프로필 수정하러 가기</Link>
          </div>
        ))}
    </>
  );
}
