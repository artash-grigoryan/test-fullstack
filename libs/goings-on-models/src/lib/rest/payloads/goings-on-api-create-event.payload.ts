import { ApiProperty } from '@nestjs/swagger';

export class GoingsOnApiCreateEventPayload {
  @ApiProperty({
    example: 'Anniversaire',
    description: "Nom de l'évènement",
  })
  name: string;

  @ApiProperty({
    example: '2022-02-22',
    description: "Date de l'évènement",
  })
  date: string;

  @ApiProperty({
    example: 'texte anniversaire',
    description: "Description de l'evenement",
  })
  description: string;

  @ApiProperty({
    example: 'organisateur@evento.com',
    description: 'Email de l’organisateur',
  })
  email: string;
}
