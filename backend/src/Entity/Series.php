<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity]
#[ApiResource]
class Series extends Media
{
    #[ORM\Column(nullable: true)]
    private ?int $seasonNumber = null;

    #[ORM\Column(nullable: true)]
    private ?int $episodeNumber = null;

    public function getSeasonNumber(): ?int { return $this->seasonNumber; }
    public function setSeasonNumber(?int $seasonNumber): static { $this->seasonNumber = $seasonNumber; return $this; }
    public function getEpisodeNumber(): ?int { return $this->episodeNumber; }
    public function setEpisodeNumber(?int $episodeNumber): static { $this->episodeNumber = $episodeNumber; return $this; }
}
