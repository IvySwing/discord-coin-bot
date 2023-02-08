const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Gives you the balance of coins'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const balance = eco.balance.get(member.id, guild.id);
		const username = interaction.user.username;

		const embedBalance = new EmbedBuilder()
			.setTitle(`${username} Balance`)
			.setDescription(`You have \`${balance}\` coins!`)
			.setColor('c3b4f7')
			.setTimestamp();
		return interaction.reply({ embeds: [embedBalance] });
	},
};