const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Claim your work reward'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const work = eco.rewards.getWork(member.id, guild.id);
		const time = eco.rewards.getWork(member.id, guild.id).cooldown.pretty;

		if (!work.status) {
			const embedNoWork = new EmbedBuilder()
				.setDescription(`You have already claimed your work reward!  You have to wait ${time} to claim again`)
				.setColor('c3b4f7')
				.setTimestamp();
			return interaction.reply({ embeds: [embedNoWork] });
		}

		const embedWork = new EmbedBuilder()
			.setTitle('Work Reward')
			.setDescription(`You have received \`${work.reward} coins\``)
			.setColor('c3b4f7')
			.setTimestamp();
		return interaction.reply({ embeds: [embedWork] });
	},
};