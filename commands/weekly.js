const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weekly')
		.setDescription('Redeem your weekly reward.'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const weekly = eco.rewards.getWeekly(member.id, guild.id);
		// const time = eco.rewards.getWeekly(member.id, guild.id).cooldown.pretty;

		if (!weekly.status) {
			const embedNoWoeekly = new EmbedBuilder()
				.setDescription('You have already claimed your weekly reward. Come back next week, same day, same time')
				.setColor('c3b4f7');
			await interaction.reply({ embeds: [embedNoWoeekly] });
		}

		const embedWeekly = new EmbedBuilder()
			.setDescription(`Congrats!! You earned \`${weekly.reward} coins.`)
			.setColor('c3b4f7');
		await interaction.reply({ embeds: [embedWeekly] });
	},
};
