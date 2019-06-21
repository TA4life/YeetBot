/************************************
To-Do: -define all functions outside this file and only call for it when the command is needed. Allow for a cleaner looking index file which will also help in debugging.
			 -get some more functions going. Think about learing how to write the functions outside of index before implemnting more functions... le sigh
*************************************/
//initit all const needed for discord bot.
const Discord = require('discord.js');
const { prefix, token} =  require('./config.json');//importing information from config file.
const client = new Discord.Client();
const weather = require('weather-js');//importing weather library for bot to use
//starts bot up once and sends ready to show bot is running
client.once('ready', () => {
	console.log('Ready!');
});
//client.on works like an infite loop to keep the bot running and looking for commands it can run (care of your else statments)
client.on('message', message => {
		if (message.content.startsWith(`${prefix}kick`)) {//reads the message and looks for command !kick
			if (message.member.hasPermission("KICK_MEMBERS")){//if the command kick is run checks to see if the user is allowed to kick people before excuting the command
				message.channel.send("sorry buddy you need to have perms");
			}else{
			let member = message.mentions.members.first();
			member.kick().then((member) => {
			message.channel.send(":wave: " + member.displayName + " has been yeeted!");//person gets yeeted out of the server with a little wave emoji ***** to-do: work to implemnt giphy gif instead of wave.
			})
		}
	}
	if(message.content.startsWith(`${prefix}ok`)){//looks for !ok
		message.channel.send("ah shit here we go again");//simple send message to channel*********to-do: look to rework this function into something more important
	}

	if(message.content.startsWith(`${prefix}weather`)){//looks for !weather command
		weather.find({search: 'Ottawa, ONT', degreeType: 'C'}, function(err, result) {//calling the weather function on designated location******** to-do: allow user to choose location for weather
			if(err) console.log(err);//prints err in the console if this runs into an error

			console.log(JSON.stringify(result, null, 2));//displaying all info in console to make sure it all works ***** to-do: remove when the function is fully operational
/*
						var current = result[0].current; // This is a variable for the current part of the JSON output
            var location = result[0].location; // This is a variable for the location part of the JSON output

            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone',`UTC${location.timezone}`, true)
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)*/

                message.channel.send(JSON.stringify(result[0].current,null,2));//temp solution to display weather while RichEmbed is being worked on
		  });
	}
})
//message.member.user.send("(Y/N)");

client.login(token);
