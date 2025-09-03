<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity]
#[ApiResource]
class Film extends Media
{
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $watchedAt = null;

    public function getWatchedAt(): ?\DateTimeImmutable { return $this->watchedAt; }
    public function setWatchedAt(?\DateTimeImmutable $watchedAt): static { $this->watchedAt = $watchedAt; return $this; }
}
