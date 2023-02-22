const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription(
			'Displays your current balance.',
		),
	async execute(interaction) {
		const { guild, member } = interaction;
		const balance = eco.balance.get(member.id, guild.id);
		// const username = interaction.user.username;

		const embedBalance = new EmbedBuilder()
			.setDescription(
				`According to the records you have \`${balance}\` coins in your bank`,
			)
			.setColor('c3b4f7');
		await interaction.reply({ embeds: [embedBalance] });
	},
};
