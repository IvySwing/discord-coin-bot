const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Redeem your daily reward'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const daily = eco.rewards.getDaily(member.id, guild.id);
		// const time = eco.rewards.getDaily(member.id, guild.id).cooldown.pretty;

		if (!daily.status) {
			const embedNoDaily = new EmbedBuilder()
				.setDescription('You redeemed your daily reward. Come back tomorrow, same day, same time')
				.setColor('c3b4f7');
			await interaction.reply({ embeds: [embedNoDaily] });
		}

		const embedDaily = new EmbedBuilder()
			.setDescription(`Congrats!! Today you collected \`${daily.reward} coins!`)
			.setColor('c3b4f7');
		await interaction.reply({ embeds: [embedDaily] });
	},
};
