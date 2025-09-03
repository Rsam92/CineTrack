<?php

namespace App\DataPersister;

use App\Entity\Media;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class MediaDataPersister
{
    private EntityManagerInterface $em;
    private Security $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    // Vérifie si ce DataPersister gère cette entité
    public function supports($data): bool
    {
        return $data instanceof Media;
    }

    // Persiste l'entité Media
    public function persist($data)
    {
        if (!$data->getUser()) {
            $user = $this->security->getUser();
            if ($user) {
                $data->setUser($user);
            }
        }

        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }

    // Supprime l'entité Media
    public function remove($data)
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}
