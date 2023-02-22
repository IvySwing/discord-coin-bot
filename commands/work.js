const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Redeem your work reward.'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const work = eco.rewards.getWork(member.id, guild.id);
		// const time = eco.rewards.getWork(member.id, guild.id).cooldown.pretty;

		if (!work.status) {
			const embedNoWork = new EmbedBuilder()
				.setDescription('You already claimed your work reward. Come back in an hour!')
				.setColor('c3b4f7');
			await interaction.reply({ embeds: [embedNoWork] });
		}

		const embedWork = new EmbedBuilder()
			.setDescription(`You have collected \`${work.reward} coins!`)
			.setColor('c3b4f7');
		await interaction.reply({ embeds: [embedWork] });
	},
};
