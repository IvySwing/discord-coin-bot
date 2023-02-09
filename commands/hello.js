const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gm')
		.setDescription('replies with a greeting'),
	async execute(interaction) {
		await interaction.reply('7 13');
	},
};
