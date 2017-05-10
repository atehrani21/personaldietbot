# PersonalDietBot

A custom chatbot built with github's [hubot](https://hubot.github.com/). Uses Hubot Chatbot with Slack as an Adapter and APIs for restaurant, food nutrition facts, and location-based services.

The bot's name is PersonalDietBot and is customized to integrate with APIs for restaurants and food nutrition. The bot will respond to the basic chatbot commands as detailed in:

```
personaldietbot help
```

and will soon respond to a custom command that draws from the restaurant APIs:

```
personaldietbot show me restaurants
```

# Setting up the Bot

1. Clone this repo
2. Sign into Slack and create a team
3. Invite your bot to your team and a channel
4. Run this command to get your bot to listen on your channel:
```
HUBOT_SLACK_TOKEN=<your slack token> ./bin/hubot --adapter slack
```
5. In your channel, type personaldietbot ping to check that your bot responds