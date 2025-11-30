const About = () => {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold">
        Hey, I&apos;m <span className="text-violet-600">Aljaz</span> 👋.
      </span>
      <p className="mt-5">
        I am a passionate <span className="font-semibold text-violet-600">software engineer</span>{' '}
        currently working at Move Work Forward.
      </p>
      <p className="mt-5">
        I was born in 2000, which makes me a part of the tech-savvy generation that has grown up
        witnessing the rapid advancements in technology.
      </p>
      <div className="mt-5">
        <p>
          As a lifelong learner, I am constantly striving to expand my skill set and stay up-to-date
          with the latest technologies. Currently, some of the technologies and skills that I
          specialize in include:
        </p>
        <div className="ml-3 mt-1 list-disc">
          <li>
            <span className="font-semibold">Front-end development</span>: HTML5, CSS3, JavaScript
            (ES5, ES6+), <span className="font-semibold">TypeScript</span>,{' '}
            <span className="font-semibold">React</span>, NextJS,{' '}
            <span className="font-semibold">Redux</span>, Vite,{' '}
            <span className="font-semibold">Jest</span>, Vitest,{' '}
            <span className="font-semibold">Cypress</span>, Bootstrap, MUI, Tailwind CSS
          </li>
          <li>
            <span className="font-semibold">Back-end development</span>: Python,{' '}
            <span className="font-semibold">Flask</span>,{' '}
            <span className="font-semibold">TypeScript</span>,{' '}
            <span className="font-semibold">NodeJS</span>, Redis, REST
          </li>
          <li>
            <span className="font-semibold">Database management</span>: MySQL, Postgres, MSSQL
          </li>
          <li>
            <span className="font-semibold">Other</span>: Git, Github, Gitlab, Docker, Docker
            Compose, Gitlab CI & Pipelines
          </li>
        </div>
      </div>
      <p className="mt-5">
        Feel free to connect with me on{' '}
        <a
          href="https://www.linkedin.com/in/aljaz-oblonsek/"
          className="font-semibold text-violet-600 hover:underline"
        >
          LinkedIn
        </a>{' '}
        or send me an{' '}
        <a
          href="mailto:aljaz.oblonsek@outlook.com"
          className="font-semibold text-violet-600 hover:underline"
        >
          email
        </a>
        . Let&apos;s collaborate and bring remarkable web experiences to life!
      </p>
    </div>
  );
};

export default About;
