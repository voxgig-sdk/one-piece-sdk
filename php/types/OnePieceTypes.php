<?php
declare(strict_types=1);

// Typed models for the OnePiece SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Boat entity data model. */
class Boat
{
    public ?string $crew = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Request payload for Boat#load. */
class BoatLoadMatch
{
    public int $id;
}

/** Match filter for Boat#list (any subset of Boat fields). */
class BoatListMatch
{
    public ?string $crew = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Bow entity data model. */
class Bow
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $owner = null;
}

/** Request payload for Bow#load. */
class BowLoadMatch
{
    public int $id;
}

/** Match filter for Bow#list (any subset of Bow fields). */
class BowListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $owner = null;
}

/** Chapter entity data model. */
class Chapter
{
    public ?int $id = null;
    public ?int $number = null;
    public ?string $release_date = null;
    public ?string $saga = null;
    public ?string $title = null;
}

/** Request payload for Chapter#load. */
class ChapterLoadMatch
{
    public int $id;
}

/** Match filter for Chapter#list (any subset of Chapter fields). */
class ChapterListMatch
{
    public ?int $id = null;
    public ?int $number = null;
    public ?string $release_date = null;
    public ?string $saga = null;
    public ?string $title = null;
}

/** Character entity data model. */
class Character
{
    public ?int $age = null;
    public ?int $bounty = null;
    public ?string $crew = null;
    public ?string $description = null;
    public ?string $devil_fruit = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Request payload for Character#load. */
class CharacterLoadMatch
{
    public int $id;
}

/** Match filter for Character#list (any subset of Character fields). */
class CharacterListMatch
{
    public ?int $age = null;
    public ?int $bounty = null;
    public ?string $crew = null;
    public ?string $description = null;
    public ?string $devil_fruit = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Crew entity data model. */
class Crew
{
    public ?string $captain = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?array $member = null;
    public ?string $name = null;
    public ?string $ship = null;
}

/** Request payload for Crew#load. */
class CrewLoadMatch
{
    public int $id;
}

/** Match filter for Crew#list (any subset of Crew fields). */
class CrewListMatch
{
    public ?string $captain = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?array $member = null;
    public ?string $name = null;
    public ?string $ship = null;
}

/** Dial entity data model. */
class Dial
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Request payload for Dial#load. */
class DialLoadMatch
{
    public int $id;
}

/** Match filter for Dial#list (any subset of Dial fields). */
class DialListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Episode entity data model. */
class Episode
{
    public ?string $air_date = null;
    public ?int $id = null;
    public ?int $number = null;
    public ?string $saga = null;
    public ?string $title = null;
}

/** Request payload for Episode#load. */
class EpisodeLoadMatch
{
    public int $id;
}

/** Match filter for Episode#list (any subset of Episode fields). */
class EpisodeListMatch
{
    public ?string $air_date = null;
    public ?int $id = null;
    public ?int $number = null;
    public ?string $saga = null;
    public ?string $title = null;
}

/** Film entity data model. */
class Film
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $release_date = null;
    public ?string $title = null;
}

/** Request payload for Film#load. */
class FilmLoadMatch
{
    public int $id;
}

/** Match filter for Film#list (any subset of Film fields). */
class FilmListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $release_date = null;
    public ?string $title = null;
}

/** Fruit entity data model. */
class Fruit
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $user = null;
}

/** Request payload for Fruit#load. */
class FruitLoadMatch
{
    public int $id;
}

/** Match filter for Fruit#list (any subset of Fruit fields). */
class FruitListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $user = null;
}

/** Gear entity data model. */
class Gear
{
    public ?string $description = null;
    public ?string $first_appearance = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Request payload for Gear#load. */
class GearLoadMatch
{
    public int $id;
}

/** Match filter for Gear#list (any subset of Gear fields). */
class GearListMatch
{
    public ?string $description = null;
    public ?string $first_appearance = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Haki entity data model. */
class Haki
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $user = null;
}

/** Request payload for Haki#load. */
class HakiLoadMatch
{
    public int $id;
}

/** Match filter for Haki#list (any subset of Haki fields). */
class HakiListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $user = null;
}

/** Location entity data model. */
class Location
{
    public ?string $description = null;
    public ?string $first_appearance = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Request payload for Location#load. */
class LocationLoadMatch
{
    public int $id;
}

/** Match filter for Location#list (any subset of Location fields). */
class LocationListMatch
{
    public ?string $description = null;
    public ?string $first_appearance = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Saga entity data model. */
class Saga
{
    public ?array $chapter = null;
    public ?string $description = null;
    public ?array $episode = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Request payload for Saga#load. */
class SagaLoadMatch
{
    public int $id;
}

/** Match filter for Saga#list (any subset of Saga fields). */
class SagaListMatch
{
    public ?array $chapter = null;
    public ?string $description = null;
    public ?array $episode = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Sword entity data model. */
class Sword
{
    public ?string $description = null;
    public ?string $grade = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $owner = null;
}

/** Request payload for Sword#load. */
class SwordLoadMatch
{
    public int $id;
}

/** Match filter for Sword#list (any subset of Sword fields). */
class SwordListMatch
{
    public ?string $description = null;
    public ?string $grade = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $owner = null;
}

/** Technique entity data model. */
class Technique
{
    public ?string $description = null;
    public ?string $gear = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Request payload for Technique#load. */
class TechniqueLoadMatch
{
    public int $id;
}

/** Match filter for Technique#list (any subset of Technique fields). */
class TechniqueListMatch
{
    public ?string $description = null;
    public ?string $gear = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Volume entity data model. */
class Volume
{
    public ?array $chapter = null;
    public ?int $id = null;
    public ?int $number = null;
    public ?string $release_date = null;
    public ?string $title = null;
}

/** Request payload for Volume#load. */
class VolumeLoadMatch
{
    public int $id;
}

/** Match filter for Volume#list (any subset of Volume fields). */
class VolumeListMatch
{
    public ?array $chapter = null;
    public ?int $id = null;
    public ?int $number = null;
    public ?string $release_date = null;
    public ?string $title = null;
}

