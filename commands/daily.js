const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Claim your daily pages'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const daily = eco.rewards.getDaily(member.id, guild.id);
		const time = eco.rewards.getDaily(member.id, guild.id).cooldown.pretty;

		if (!daily.status) {
			const embedNoDaily = new EmbedBuilder()
				.setTitle(`You have already claimed your daily pages!  You have to wait ${time} to claim again`)
				.setColor('c3b4f7')
				.setTimestamp();
			return interaction.reply({ embeds: [embedNoDaily] });
		}

		const embedDaily = new EmbedBuilder()
			.setTitle('Daily Hunt')
			.setDescription(`You have gathered \`${daily.reward} pages 📜\`- shhhhh!`)
			.setColor('c3b4f7')
			.setTimestamp();
		return interaction.reply({ embeds: [embedDaily] });
	},
};