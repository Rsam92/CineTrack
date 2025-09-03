<?php
namespace App\DataPersister;

use ApiPlatform\Doctrine\Orm\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Media;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

final class MediaDataPersister implements ContextAwareDataPersisterInterface
{
    private EntityManagerInterface $em;
    private Security $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Media;
    }

    public function persist($data, array $context = [])
    {
        if (!$data->getUser()) {
            $data->setUser($this->security->getUser());
        }
        $this->em->persist($data);
        $this->em->flush();
        return $data;
    }

    public function remove($data, array $context = [])
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}
