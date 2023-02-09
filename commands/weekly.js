const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weekly')
		.setDescription('Claim your weekly divination'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const weekly = eco.rewards.getWeekly(member.id, guild.id);
		const time = eco.rewards.getWeekly(member.id, guild.id).cooldown.pretty;

		if (!weekly.status) {
			const embedNoWoeekly = new EmbedBuilder()
				.setDescription(`You have already claimed your weekly pages!  You have to wait ${time} to claim again`)
				.setColor('c3b4f7')
				.setTimestamp();
			return interaction.reply({ embeds: [embedNoWoeekly] });
		}

		const embedWeekly = new EmbedBuilder()
			.setTitle('Exploration and Explore')
			.setDescription(`You have received \`${weekly.reward} pages 📜\``)
			.setColor('c3b4f7')
			.setTimestamp();
		return interaction.reply({ embeds: [embedWeekly] });
	},
};