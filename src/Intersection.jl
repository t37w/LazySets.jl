import Base.isempty

export Intersection, ∩

"""
    Intersection{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}

Type that represents the intersection of two convex sets.

### Fields

- `X` -- convex set
- `Y` -- convex set
"""
struct Intersection{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}
    X::S1
    Y::S2

    # default constructor with dimension check
    Intersection{N, S1, S2}(X::S1, Y::S2) where
        {S1<:LazySet{N}, S2<:LazySet{N}} where {N<:Real} =
            dim(X) != dim(Y) ? throw(DimensionMismatch) : new(X, Y)
end
# type-less convenience constructor
Intersection(X::S1, Y::S2) where {S1<:LazySet{N}, S2<:LazySet{N}} where {N<:Real} =
    Intersection{N, S1, S2}(X, Y)

"""
    ∩

Alias for `Intersection`.
"""
∩(X, Y) = Intersection(X, Y)

"""
    Intersection(X, ∅)

Intersection of a set with the empty set from the right.

### Input

- `X` -- a convex set
- `∅` -- an empty set

### Output

An empty set, because the empty set is the absorbing element for the
intersection.
"""
Intersection(::LazySet, ∅::EmptySet) = ∅

"""
    Intersection(∅, X)

Intersection of a set with the empty set from the left.

### Input

- `∅` -- an empty set
- `X` -- a convex set

### Output

An empty set, because the empty set is the absorbing element for the
intersection.
"""
Intersection(∅::EmptySet, ::LazySet) = ∅

# special case: pure empty set intersection (we require the same numeric type)
(Intersection(∅::E, ::E)) where {E<:EmptySet} = ∅

"""
    dim(cap::Intersection)::Int

Return the dimension of an intersection of two convex sets.

### Input

- `cap` -- intersection of two convex sets

### Output

The ambient dimension of the intersection of two convex sets.
"""
function dim(cap::Intersection)::Int
    return dim(cap.X)
end

"""
    σ(d::AbstractVector{<:Real}, cap::Intersection)::AbstractVector{<:Real}

Return the support vector of an intersection of two convex sets in a given
direction.

### Input

- `d`   -- direction
- `cap` -- intersection of two convex sets

### Output

The support vector in the given direction.
"""
function σ(d::AbstractVector{<:Real}, cap::Intersection)::AbstractVector{<:Real}
    # TODO document behavior if the direction has norm zero
    # TODO error message if the intersection is empty!
    # TODO implement
    error("not implemented yet")
end

"""
    isempty(cap::Intersection)::Bool

Return if the intersection is empty or not.

### Input

- `cap` -- intersection of two convex sets

### Output

`true` iff the intersection is empty.
"""
function isempty(cap::Intersection)::Bool
    return is_intersection_empty(cap.X, cap.Y)
end