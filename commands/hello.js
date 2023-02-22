const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gm')
		.setDescription('Say Hi!!'),
	async execute(interaction) {
		await interaction.reply('7 13');
	},
};
