import Head from "next/head";
import { GetStaticProps } from "next";
import { millify } from "millify";
import { DiscordClient, PartialGuild } from "../utils/DiscordClient";
import { Card } from "../components/Card";
import { config } from "../utils/config";
import { APIGuild } from "discord-api-types/v8";

type HomeProps = { guild: APIGuild | PartialGuild };

const client = new DiscordClient(config.bot_token);

export default function Home(props: HomeProps) {
  

  return (
    <div className="max-w-lg mx-auto mt-20 p-10 justify-center items-center">
      <Head>
        <title>{props.guild.name}</title>
      </Head>
      <div className="flex items-center justify-center mb-5 block">
        <img
          src={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
          height={75}
          width={75}
          loading="eager"
          className="rounded-full shadow-sm"
          alt={`Discord server icon of ${props.guild.name}`}
        />
      </div>
      <h2 className="text-center font-bold text-5xl">{props.guild.name}</h2>
      <div className="text-center mb-10 mt-2">
        <a
          href={config.guild_invite}
          className="bg-indigo-50 font-medium mt-5 text-indigo-600 px-4 py-1.5 rounded-full inline-block"
        >
          Bluzelle Discord Bot
        </a>
      </div>
      <h3
        className={
          "rounded-md mb-10 text-center p-2 bg-green-50 text-green-500"
        }
      >
       Bluzelle discord bot is a bot in discord that can send data from bluzelle network straight to discord
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <Card
          href={`https://discord.com/api/oauth2/authorize?client_id=861035739277688844&permissions=18432&scope=applications.commands%20bot`}
          description="Invite the bot"
          title="Invite"
        />
        
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const guild = await client.getGuild(config.guild_id || config.guild_invite);

  return {
    props: { guild },
    revalidate: 60 * 60,
  };
};